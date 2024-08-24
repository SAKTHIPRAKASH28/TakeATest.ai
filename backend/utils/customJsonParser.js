async function extractJson(textResponse) {
    const pattern = /{(?:\s*"section":\s*".*?",\s*"question":\s*".*?",\s*"marks":\s*\d+\s*,?\s*)+}/g;
    const matches = [...textResponse.matchAll(pattern)];
    const jsonObjects = [];

    for (const match of matches) {
        let jsonStr = match[0];

        try {
            let jsonObj = JSON.parse(jsonStr);
            jsonObjects.push(jsonObj);
        } catch (e) {
          
            const extendedJsonStr =await  extendSearch(textResponse, match.index);
            try {
                let jsonObj = JSON.parse(extendedJsonStr);
                jsonObjects.push(jsonObj);
            } catch (e) {
            
                next(e)
            }
        }
    }

    return jsonObjects.length > 0 ? jsonObjects : null;
}

async function extendSearch(text, start) {
    let nestCount = 0;
    let end = start;

    for (let i = start; i < text.length; i++) {
        if (text[i] === '{') {
            nestCount++;
        } else if (text[i] === '}') {
            nestCount--;
            if (nestCount === 0) {
                end = i + 1;
                break;
            }
        }
    }

    return text.substring(start, end);
}

module.exports = {extractJson}
