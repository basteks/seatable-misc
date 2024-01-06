function outputTable(obj) {
    function filterUnique(keys,totalKeys) {
        let found = false;
        for (let i=0;i<totalKeys.length;i++) {
            if (totalKeys[i].length==keys.length) {
              let foundCounter = 0;
              for (let k=0;k<keys.length;k++) {
                if(totalKeys[i].indexOf(keys[k])>-1) { foundCounter +=1 };
              }
              if (foundCounter==keys.length) {
                found = true;
                break;
              }
            }
        }
        return found;
    }
    function getDataStr(data,level,displayKeys) {
        let res = "";
        if (data.constructor== Object) {
            for (let i=0;i<Object.keys(data).length;i++) {
                if (res!="") { res += level==0 ? " | " : "; "; }
                res+= displayKeys? Object.keys(data)[i]+": "+getDataStr(Object.values(data)[i],level+1):getDataStr(Object.values(data)[i],level+1);
            }
        } else if (data.constructor== Array) {
            for (let i=0;i<data.length;i++) {
                if (res!="") { res += level==0 ? " | " : "; "; }
                res+= getDataStr(data[i],level+1,displayKeys);
            }
        } else {
          if (typeof(data)=="boolean") { res = data? "✓":"⨯";}
          else { res = data.toString(); }
        }
      return res;
    }
    function getKeys(obj) {
      let res=[];
      //output.text("obj:");
      //output.text(obj);
        if (obj.constructor==Object){
          for (let i=0; i< Object.keys(obj).length; i++) {
            //output.text(Object.keys(obj)[i]);
            if (!filterUnique(Object.keys(obj)[i],res)) {
		      res.push(Object.keys(obj)[i]); 
		    }
          }
        } else if (obj.constructor==Array) {
          for (let i=0; i<Object.keys(obj).length; i++) {
             if (getKeys(obj[i]).length>0 && !filterUnique(getKeys(obj[i]),res)) { res.push(getKeys(obj[i])); }
          }
        } else { res.push(" "); }
        return res;
    }
	var markdownTableRows = [];
	var columnNumber = 0;
	var objKeys = getKeys(obj);
    if (objKeys.length==1) {
      output.text("length 1");
      for (let i=0; i< Object.keys(obj).length; i++) {
	    let firstCol = obj.constructor==Object? Object.keys(obj)[i]:i.toString();
	    markdownTableRows.push("| " + firstCol + " | " + getDataStr(Object.values(obj)[i],0,false));
      }
	  let hLine = "|:---:|";
	  for (let i=0;i<objKeys[0].length;i++) {
		hLine+= ':---:|';
	  }
	  markdownTableRows.unshift(hLine);
	  markdownTableRows.unshift("| | "+objKeys.toString().replaceAll(","," | ")+" |");
	}
    else {
      //output.text("length: "+objKeys.length.toString())
	  let maxSize = 0;
      for (let i=0; i< Object.keys(obj).length; i++) {
	    let firstCol = obj.constructor==Object? Object.keys(obj)[i]:i.toString();
	    markdownTableRows.push("| " + firstCol + " | " + getDataStr(Object.values(obj)[i],0,true));
        /*output.text("| " + firstCol + " | " + getDataStr(Object.values(obj)[i],0,true));
        output.text(Object.values(obj)[i]);
        output.text(typeof(Object.values(obj)[i]));
        output.text(Object.keys(Object.values(obj)[i]).length);*/
        var objSize = typeof(Object.values(obj)[i])=="object"? Object.keys(Object.values(obj)[i]).length : 1;
        //output.text("objSize: "+objSize.toString());
        maxSize = Math.max(maxSize,objSize);
      }
	  let hLine = "|:---:|";
	  let labels = "| |"
	  for (let i=1;i<maxSize+1;i++) {
		hLine+= ':---:|';
		labels+= ' '+i.toString()+' |';
	  }
	  markdownTableRows.unshift(hLine);
	  markdownTableRows.unshift(labels);
	}
	
    output.markdown(markdownTableRows.toString().replaceAll(",","\n").replaceAll(';',','));
	
}
