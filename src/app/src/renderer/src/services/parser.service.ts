export class ParserService {
  public static parseInput(input: string): string {
    // replace all occurrences of "|x|" with "abs ( x )"
    let regex = /\|(.?\d+(\.\d+)?|\w+)\|/g;
    input = input.replace(regex, 'abs ( $1 )');

    // replace all occurrences of "root(x,n)" with "root n ( x )"
    regex = /root\((.?\d+(\.\d+)?|\w+),(\d+)\)/g;
    input = input.replace(regex, 'root $3 ( $1 )');

    // replace all occurrences of "x!" with "fact ( x )"
    regex = /(-?\d+(\.\d+)?|\w+)!/g;
    input = input.replace(regex, 'fact ( $1 )');

    // add space before and after every + * /
    regex = /(\+|\*|\/)/g;
    input = input.replace(regex, ' $1 ');

    // add space after every - that if followed by function abs, root of fact
    regex = /-(abs|root|fact)/g;
    input = input.replace(regex, ' - $1');

    // add space before and after "-" when there is a ')' before it
    regex = /\)(-)/g;
    input = input.replace(regex, ') $1 ');

    // add space only before "-" when there is "(" before it
    regex = /(\()(-)/g;
    input = input.replace(regex, '$1 $2');

    // add space before and after "-" when there is a number before it
    regex = /(\d)(-)/g;
    input = input.replace(regex, '$1 $2 ');

    // remove any double spaces
    regex = /\s\s/g;
    input = input.replace(regex, ' ');

    return input;
  }
}
