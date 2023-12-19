const search = require("./Search");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


test('should ', () => {

        let obj = {
            task: "Testing",
            description: "Testing left"
        }
        const dom = new JSDOM(`<! DOCTYPE html><body><input id="search1"/>test</body>`);
        // let value = dow.window.document.getElementById("search1");
        let value = "testing";
        let searched = value.toLowerCase();
        expect(obj.task.toLowerCase().includes(searched)).toBe(true);
        expect(obj.description.toLowerCase().includes(searched)).toBe(true);

})
