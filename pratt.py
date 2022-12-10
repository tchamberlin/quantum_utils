import argparse
import re


class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.index = 0

        self.PRECEDENCES = {
            "LOWEST": 1,
            "OR": 2,
            "AND": 3,
            "ATTACK": 4,
        }

        self.LEFT_DENOTATIONS = {
            "∧": self.parse_infix_expression,
            "&": self.parse_infix_expression,
            "∨": self.parse_infix_expression,
            "∥": self.parse_infix_expression,
            "|": self.parse_infix_expression,
            ":": self.parse_infix_expression,
        }

        self.OP_MAP = {
            "∧": do_and,
            "&": do_and,
            "∨": do_or,
            "∥": do_or,
            "|": do_or,
            ":": do_encounter,
        }

        self.OPERATOR_PRECEDENCES = {
            "∧": self.PRECEDENCES["AND"],
            "&": self.PRECEDENCES["AND"],
            "∨": self.PRECEDENCES["OR"],
            "|": self.PRECEDENCES["OR"],
            "∥": self.PRECEDENCES["OR"],
            ":": self.PRECEDENCES["ATTACK"],
        }

        self.NULL_DENOTATIONS = {
            "ship": self.parse_ship,
            "(": self.parse_grouped_expression,
        }

    @property
    def current_token(self):
        try:
            return self.tokens[self.index]
        except IndexError:
            return None

    def peek_token(self):
        self.tokens[self.index + 1]

    def advance(self):
        self.index += 1

    def parse_expression(self, precedence=1):
        token = self.current_token
        fn = self.NULL_DENOTATIONS[token["type"]]
        left = fn()
        while self.current_token and precedence < self.OPERATOR_PRECEDENCES.get(
            self.current_token["type"], self.PRECEDENCES["LOWEST"]
        ):
            fn = self.LEFT_DENOTATIONS[self.current_token["type"]]
            left = fn(left)

        print(f"{left=}")
        return left

    def parse_ship(self):
        ship = int(self.current_token["literal"])
        self.advance()
        return ship

    def parse_infix_expression(self, left):
        op = self.current_token["type"]
        fn = self.OP_MAP[op]
        self.advance()
        right = self.parse_expression(self.OPERATOR_PRECEDENCES[op])
        return fn(left, right)

    def parse_grouped_expression(self):
        self.advance()
        result = self.parse_expression(self.PRECEDENCES["LOWEST"])
        if not self.current_token:
            raise ValueError("Expected ')'; got EOF")
        elif self.current_token["type"] != ")":
            raise ValueError(f"Expected ')'; got {self.current_token}")
        return result


def do_and(left, right):
    return left * right


def do_or(left, right):
    return 1 - ((1 - left) * (1 - right))


def do_encounter(attacker, defender):
    return (attacker - defender + 1) * 0.5


def lex(string):
    string = re.sub(r"\s*", "", string)
    parsed = []
    for char in string:
        if char.isnumeric():
            parsed.append({"type": "ship", "literal": int(char)})
        else:
            parsed.append({"type": char})
    return parsed


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("encounters")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    tokens = lex(args.encounters)
    p = Parser(tokens)

    result = p.parse_expression()
    print(result)
