interface EventProps {
    id: number;
    name: string;
    date: Date;
    local: string;
}

export class Event {
    private props: EventProps;

    constructor(props: EventProps) {
        this.props = props;
    }

    get id(): number {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get date(): Date {
        return this.props.date;
    }

    get local(): string {
        return this.props.local;
    }
}
