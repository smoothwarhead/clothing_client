const StringFormat = {

    changeToUpper(str){
        let result = str.charAt(0).toUpperCase();
        let result2 = str.slice(1);
      
        let result3 = result + result2;
        return result3;
    },

    formatUrl(str){
        let result = str.slice(8);
        
        return result;
    },

    truncateWord(str, length, ending){
        if (length == null) {
            length = 24;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    }



}

export default StringFormat;