import scrambleJwt from './scramble-jwt';

it('should scramble the JWT string to the desired format', () => {
    const separatorRandom = 'BCB';
    const separatorJwt = '#';

    const scrambled = scrambleJwt('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjY1ZTdmNTdmLTc1OTktNGQ0My1iZGNmLWY3YjU1MmVkNjg5NiIsImlhdCI6MTU3NzQxOTEyMSwiZXhwIjoxNTc3NDIyNzIxfQ.UEhw04MZ6lEzLqS_GfKVZVCmic7p51plXWj5-GWBsqg');

    // should have at least 3 'BCBs' as separatorRandom    
    const splitBySeparatorJwt = scrambled.split(separatorJwt);

    // there will be 6 parts separated by separatorJwt
    expect(splitBySeparatorJwt.length)
        .toBe(6);

    // array#0 is a useless 32 characters string
    expect(splitBySeparatorJwt[0].length)
        .toBe(32);

    // array#1 has 3 separatorRandoms
    expect(RegExp(`^([0-9]*${separatorRandom}){3}$`).test(splitBySeparatorJwt[1]))
        .toBe(true);

    // array#2 contains payloads (alphanumeric)
    expect(RegExp(`^[0-9A-Za-z]*$`).test(splitBySeparatorJwt[2]))
        .toBe(true);

    // array#3 contains sign (alphanumeric with '_', '-')
    expect(RegExp(`^[0-9A-Za-z_-]*$`).test(splitBySeparatorJwt[3]))
        .toBe(true);

    // array#4 contains header (alphanumeric)
    expect(RegExp(`^[0-9A-Za-z]*$`).test(splitBySeparatorJwt[4]))
        .toBe(true);

    // array#5 is a useless 32 characters string
    expect(splitBySeparatorJwt[5].length)
        .toBe(32);
});
