export interface Optional<T> {
    map<R>(fn: (value: T) => R): Optional<R>;
    flatMap<R>(fn: (value: T) => Optional<R>): Optional<R>;
    flatMapLift<R>(fn: (value: T) => R | undefined): Optional<R>;
    orUndefined(): T | undefined;
    orThrow(): T;
    orElse(defaultValue: T): T;
}

class Some<T> implements Optional<T> {
    constructor(private value: T) { }
    
    map<R>(fn: (value: T) => R): Optional<R> {
        return new Some(fn(this.value));
    }

    flatMap<R>(fn: (value: T) => Optional<R> ): Optional<R> {
        return fn(this.value);
    }

    flatMapLift<R>(fn: (value: T) => R | undefined): Optional<R> {
        const result = fn(this.value);
        return result === undefined ? nothing : new Some(result);
    }

    orUndefined(): T {
        return this.value;
    }

    orThrow(): T {
        return this.value;
    }

    orElse(): T {
        return this.value;
    }

}

class Nothing implements Optional<any> {
    map<R>(): Optional<R> {
        return this;
    }

    flatMap<R>(): Optional<R> {
        return this;
    }

    flatMapLift<R>(): Optional<R> {
        return this;
    }

    orUndefined(): undefined {
        return undefined;
    }

    orThrow(): never {
        throw new Error("No value");
    }

    orElse<T>(defaultValue: T): T {
        return defaultValue;
    }
}

export const nothing = new Nothing();

export function optional<T>(value: T | undefined): Optional<T> {
    return value === undefined ? nothing : new Some(value);
}

export function optionalOf<T>(value: T): Optional<T> {
    return new Some(value);
}
