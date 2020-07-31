import {greeter} from '../src/greeter';

describe('greeter', () => {
    test("greeter test", () =>{
        expect(greeter("Brian")).toBe("Hello, Brian");
    });    
});
