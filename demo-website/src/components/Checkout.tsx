import React, { useContext, useEffect, useId } from "react";
import { CartContext } from "../CartProvider";
import { CartItemComponent } from "./CartItem";

enum PaymentMethod { Invoice, CreditCard, PayPal };

function CreditCardForm() {
    // State for credit card information
    const [cardNumber, setCardNumber] = React.useState("");
    const [expirationDate, setExpirationDate] = React.useState("");
    const [securityCode, setSecurityCode] = React.useState("");

    return <div>
        <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
        <input type="text" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
        <input type="text" value={securityCode} onChange={e => setSecurityCode(e.target.value)} />
    </div>;
}

function TextInput({ label, value, onChange, validator, validationContext }: { label: string, value: string, onChange: (value: string) => void, validator?: ValidationFunction, validationContext: ValidationContext }) {
    const [error, setError] = React.useState(undefined as ValidationError | undefined);
    const id = useId();
    const valueRef = React.useRef(value);
    useEffect(() => {
        const unregister = validationContext.registerValidator(validator ? composeValidators(validator, validateRequired) : validateRequired, valueRef, label, id);
        return unregister;
    }, [validator, validationContext, label, id]);

    return <div>
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} value={value} onChange={e => {
            const newValue = e.target.value;
            const newError = validator?.(newValue, label);
            setError(newError);
            onChange(newValue);
            valueRef.current = newValue;
        }} className={error ? 'error' : ''} />
        {error && (validationContext.showPedantic || !error.pedantic) && < span>{error.message}</span>}
    </div>;
}

type ValidationFunction = (value: string, label: string) => ValidationError | undefined;

interface ValidationError {
    message: string;
    pedantic: boolean; // pedantic errors are only shown after the user has tried to submit the form
}

interface ValidationContext {
    showPedantic(): boolean;
    registerValidator(validator: ValidationFunction, value: React.MutableRefObject<string>, label: string, id: string): () => void;
    collectErrors(): ValidationError[];
}

const validateRequired = (value: string, label: string) => {
    if (value.trim() === "") {
        return { message: `${label} is required`, pedantic: true };
    }
}

const containsInteger = (value: string) => {
    return value.split("").some(c => "0123456789".includes(c));
}

const validateIsStreetAddress = (value: string, label: string) => {
    // validate that the street address is composed of a street name and a house number
    const parts = value.split(" ").filter(part => part.trim() !== "");
    if (parts.length < 2 || !containsInteger(parts[parts.length - 1])) {
        return { message: `${label} must be a street name and a house number`, pedantic: false };
    }
}

const validateIsZipCode = (value: string, label: string) => {
    // validate that the zip code is a valid zip code
    if (value.length !== 5) {
        return { message: `${label} must be 5 digits`, pedantic: false };
    }
}

const composeValidators = (...validators: ((value: string, label: string) => ValidationError | undefined)[]) => (value: string, label: string) => {
    for (const validator of validators) {
        const error = validator(value, label);
        if (error) {
            return error;
        }
    }
}

class ValidationContextImpl implements ValidationContext {
    validators: Record<string, {
        validator: ValidationFunction;
        value: React.MutableRefObject<string>;
        label: string;
    }> = {};

    constructor(public showPedantic: () => boolean) {
        this.validators = {};
    }

    registerValidator(validator: ValidationFunction, value: React.MutableRefObject<string>, label: string, id: string) {
        this.validators[id] = { validator, value, label };
        return () => {
            delete this.validators[id];
        }
    }

    collectErrors() {
        return Object.values(this.validators).map(({ validator, value, label }) => validator(value.current, label)).filter(error => error !== undefined) as ValidationError[];
    }
}

export function Checkout() {
    const cart = useContext(CartContext);
    // State for customer and address information and payment method
    const [triedSubmit, setTriedSubmit] = React.useState(false); // used to show pedantic errors
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [streetAddress, setStreetAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState(PaymentMethod.Invoice);

    const triedSubmitRef = React.useRef(triedSubmit);
    useEffect(() => {
        triedSubmitRef.current = triedSubmit;
    }, [triedSubmit]);

    const validationContext: ValidationContext = React.useMemo(() => new ValidationContextImpl(() => triedSubmitRef.current), []);

    return <div className="checkout">
        <div className="checkout__cart">
            <h2>Cart</h2>
            {!cart.loading && Object.values(cart.cart).map(item => <CartItemComponent item={item} />)}
            <h3>Total: {cart.loading ? "Loading..." : cart.total}</h3>
        </div>
        <form className="checkout__form">
            <div className="checkout__form__customer">
                <h2>Customer</h2>
                <TextInput label="First Name" value={firstName} onChange={setFirstName} validationContext={validationContext} validator={validateRequired} />
                <TextInput label="Last Name" value={lastName} onChange={setLastName} validationContext={validationContext} validator={validateRequired} />
            </div>
            <div className="checkout__form__address">
                <h2>Address</h2>
                <TextInput label="Country" value={country} onChange={setCountry} validationContext={validationContext} validator={validateRequired} />
                <TextInput label="Street Address" value={streetAddress} onChange={setStreetAddress} validationContext={validationContext} validator={composeValidators(validateRequired, validateIsStreetAddress)} />
                <TextInput label="City" value={city} onChange={setCity} validationContext={validationContext} validator={validateRequired} />
                <TextInput label="State" value={state} onChange={setState} validationContext={validationContext} validator={validateRequired} />
                <TextInput label="Zip Code" value={zipCode} onChange={setZipCode} validationContext={validationContext} validator={composeValidators(validateRequired, validateIsZipCode)} />
            </div>
            <div className="checkout__form__payment">
                <h2>Payment</h2>
                <select value={paymentMethod} onChange={e => setPaymentMethod(parseInt(e.target.value))}>
                    <option value={PaymentMethod.Invoice}>Invoice</option>
                    <option value={PaymentMethod.CreditCard}>Credit Card</option>
                    <option value={PaymentMethod.PayPal}>PayPal</option>
                </select>
                {paymentMethod === PaymentMethod.CreditCard && <CreditCardForm />}
            </div>
            <button type="submit" onClick={e => {
                setTriedSubmit(true);
                const errors = validationContext.collectErrors();
                if (errors.length !== 0) {
                    e.preventDefault();
                }
            }}>Submit</button>
            {triedSubmit && validationContext.collectErrors().length !== 0 && <div className="checkout__form__errors">
                {validationContext.collectErrors().map(error => <div>{error.message}</div>)}
            </div>
            }
        </form>
    </div>;
}