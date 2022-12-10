import query from './results/query';

interface Token {
    type: string,
    literal?: any,
}

class EncounterParser {
    tokens: Array<Token>;
    index: number;
    PRECEDENCES: any;
    LEFT_DENOTATIONS: any;
    OP_MAP: any;
    NULL_DENOTATIONS: any;
    OPERATOR_PRECEDENCES: any;

    constructor(tokens: Array<Token>) {
        this.tokens = tokens;
        this.index = 0;
        console.log("tokens", tokens)

        this.PRECEDENCES = {
            LOWEST: 1,
            OR: 2,
            AND: 3,
            ATTACK: 4,
        }
    
        this.LEFT_DENOTATIONS = {
            "∧": (left?: number) => this.parse_infix_expression(left),
            "&": (left?: number) => this.parse_infix_expression(left),
            "∨": (left?: number) => this.parse_infix_expression(left),
            "∥": (left?: number) => this.parse_infix_expression(left),
            "|": (left?: number) => this.parse_infix_expression(left),
            ":": (left?: number) => this.parse_infix_expression(left),
        }
    
        this.OP_MAP = {
            "∧": (left: number, right: number) => this.do_and(left, right),
            "&": (left: number, right: number) => this.do_and(left, right),
            "∨": (left: number, right: number) => this.do_or(left, right),
            "∥": (left: number, right: number) => this.do_or(left, right),
            "|": (left: number, right: number) => this.do_or(left, right),
            ":": (attacker: number, defender: number) => this.do_encounter(attacker, defender),
        }

        this.OPERATOR_PRECEDENCES = {
            "∧": this.PRECEDENCES.AND,
            "&": this.PRECEDENCES.AND,
            "∨": this.PRECEDENCES.OR,
            "|": this.PRECEDENCES.OR,
            "∥": this.PRECEDENCES.OR,
            ":": this.PRECEDENCES.ATTACK,
        }
    
        this.NULL_DENOTATIONS = {
            "ship": () => this.parse_ship(),
            "number": () => this.parse_ship(),
            "(": () => this.parse_grouped_expression(),
        }
    }

    

    do_and(left: number, right: number) {
        console.log("do_and")
        return left * right;
    }
    
    do_or(left: number, right: number) {
        console.log("do_or")
        return 1 - ((1 - left) * (1 - right));
    }

    // TODO: Enable cards
    do_encounter(attacker: number, defender: number) {
        const odds = query({attacker: { ship: attacker, cards: []}, defender: {ship: defender, cards: []}})
        console.log("encounter", attacker, "vs", defender, "odds:", odds)
        return odds;
    }

    current_token(): Token {
        return this.tokens[this.index];
    }

    peek_token(): Token {
        return this.tokens[this.index];
    }

    advance(): void {
        this.index++;
    }

    parse_expression(precedence=this.PRECEDENCES.LOWEST): number {
        console.log("parse_expression", precedence)
        let operation = this.NULL_DENOTATIONS[this.current_token().type];
        let left = operation();
        while (this.current_token() && precedence < (this.OPERATOR_PRECEDENCES[this.current_token().type] || this.PRECEDENCES.LOWEST)) {
            operation = this.LEFT_DENOTATIONS[this.current_token().type];
            left = operation(left);
        }
        console.log("left", left)
        return left;   
    }

    parse_ship(): number {
        const ship = Number(this.current_token()?.literal)
        this.advance();
        return ship;
    }

    parse_grouped_expression(): number {
        this.advance()
        const result = this.parse_expression(this.PRECEDENCES.LOWEST)
        if (!this.current_token()) {
            throw new Error("Expected ')'; got EOF");
        } else if (this.current_token().type !== ")") {
            throw new Error(`Expected ')'; got ${this.current_token()}`)
        }
        return result
    }

    parse_infix_expression(left: number): number {
        const operator = this.current_token().type;
        const fn = this.OP_MAP[operator]
        this.advance()
        const right = this.parse_expression(this.PRECEDENCES[operator])
        return fn(left, right);
    }
};

export default EncounterParser;
