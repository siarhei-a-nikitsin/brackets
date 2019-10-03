const check = function check(str, bracketsConfig) {
    const allBrackets = {};
    const closedOpenedBracketsMap = {};
	const stackBrackets = [];

	if (!Array.isArray(bracketsConfig)) {
		return false;
	}

	bracketsConfig.forEach(bracketConfig => {
        if(!Array.isArray(bracketConfig)){
            return false;
        }

        const openedBracket = bracketConfig[0];
        const closedBracket = bracketConfig[1];
        allBrackets[openedBracket] = true;
        allBrackets[closedBracket] = true;

        closedOpenedBracketsMap[closedBracket] = openedBracket;
    });

	for (let i = 0; i < str.length; i++) {
        const currentSymbol = str[i];

        const openedBracketByCurrentBracket = closedOpenedBracketsMap[currentSymbol];

        // opened and closed brackets are the same
        if(openedBracketByCurrentBracket === currentSymbol) {
            if(stackBrackets.length > 0 && stackBrackets[stackBrackets.length - 1] === currentSymbol) {
                stackBrackets.pop();
                continue;
            }

            stackBrackets.push(currentSymbol);
        }
        else {
            if(openedBracketByCurrentBracket){
                const lastBracket = stackBrackets.pop();
    
                if(openedBracketByCurrentBracket === lastBracket){
                    continue;
                }
                else {
                    return false;
                }
    
            } else {
                if(allBrackets[currentSymbol]){
                    stackBrackets.push(currentSymbol);
                }
            }    
        }
	}

    if(stackBrackets.length > 0){
        return false;   
    }

	return true;;
};
module.exports = check;