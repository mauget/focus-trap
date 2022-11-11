import trapFocusInComponent from "./trapFocusInComponent";


describe('trapFocusInComponent', ()=>{
    const ref = {current: { querySelectorAll: () => (['zzz']) }};

    it('should ignore non-tab key-down',()=>{
        const event = {key: 'Not a Tab', shiftKey: false};
        expect(trapFocusInComponent(event, ref)).toBeFalsy();
    });

    it('should handle a forward tab',()=>{
        const event = {key: 'Tab', shiftKey: false };
        expect(trapFocusInComponent(event, ref)).toBeFalsy();
    });

    it('should handle a backtab',()=>{
        const event = {key: 'Tab', shiftKey: true };
        expect(trapFocusInComponent(event, ref)).toBeFalsy();
    });
});
