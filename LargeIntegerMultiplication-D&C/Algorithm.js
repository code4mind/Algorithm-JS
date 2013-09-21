	window._user_count=0;
	window._user_radio=2;
	function callFunc (numa,numb) {
		var lena=numa.toString().length;
		
		var lenb=numb.toString().length;
		var result,fa,la,fb,lb;
		var tmp=new Array();
		if(lena<=1){
			return parseInt(numa)*parseInt(numb);
		}else{
		
		fa=numa.substr(0,numa.length/2);
		la=numa.substr(lena/2,lena/2);
		fb=numb.substr(0,numb.length/2);
		lb=numb.substr(lenb/2,lenb/2);
		result=""
		var AC10n=movePos(callFunc(fa,fb),lena);
		var ADBC10N=movePos(bigPlus(callFunc(fa,lb),callFunc(la,fb)),Math.floor(lena/2));
		var BD=callFunc(la,lb);
		result=bigPlus(bigPlus(AC10n,ADBC10N),BD);
		$("#shows").append("<tr id='p_"+_user_count+"'><td class='no'><span><bold>"+_user_count+"</bold></span></td><td class='des'><span><b>AC*10^n+(AD+BC)*10^(n/2)+BD=</b></span></td><td><textarea class='midres'>"+removeZero(result)+"</textarea></td></tr>")
		_user_count+=1;
		console.log("cout:"+_user_count);
		//result=bigPlus(bigPlus(movePos(callFunc(fa,fb),lena),movePos(bigPlus(callFunc(fa,lb),callFunc(la,fb)),Math.floor(lena/2))),callFunc(la,lb));
		return result;
	}
	}//用于迭代，乘法计算
	function movePos (num,len) {
		var res="";
		res=num.toString();
		for(var i=0;i<len;i++){
			res=res+"0";

		}
		return res;
	}//用于移位
	function bigPlus (numa,numb) {
		var maxlen=0;
		var res;
		numa=numa.toString();
		numb=numb.toString();
		if(numa.length>numb.length){
		
		}else{
		
			maxlen=numb.length;
		}
	
		var length=parseInt(maxlen)+1;
		
		var set=new Array(length);
		for(var cc=0;cc<length;cc++){
            set[cc]=0;
		}
		var m ,i,j,n;
		for(m=0,i=numa.length,j=numb.length;m<maxlen;m++){
			if(i==0&&j!=0){
				set[length-1]+=parseInt(numb.substr(j-1,1));
				
			}else if(j==0&&i!=0){
				set[length-1]+=parseInt(numa.substr(i-1,1));
			
			}else{
				set[length-1]+=parseInt(numa.substr(i-1,1))+parseInt(numb.substr(j-1,1));
			  
			}

			if(set[length-1]>=10){
				set[length-2]=set[length-2]+1;
				set[length-1]=set[length-1]-10;
			}
			if(i>0){
				i--;
			}
			if(j>0){
				j--;
			}
			length--;
		}
	
		var str="";
		if(set[0]==0){
			for(var tmp=1;tmp<maxlen+1;tmp++){
				
				str=str+set[tmp].toString();
			}
		}
		else{
			for(var tmp=0;tmp<maxlen+1;tmp++){
				
				str=str+set[tmp].toString();
			}
		}
			
		
		
		return str;
		
	}//用于大数相加
	function BigMulti (rawa,rawb) {
		var lena=rawa.length;
		var lenb=rawb.length;
		while(lena%_user_radio!=0){
			rawa="0"+rawa;
			lena=rawa.length;
		
		}	
		while(lenb%_user_radio!=0){
			rawb="0"+rawb;
			lenb=rawb.length;
		
		}

		if(lena>lenb){
			while(lena>lenb){
				rawb="0"+rawb;
				lenb=rawb.toString().length;
			}
		}
		if(lena<lenb){
			while(lenb>lena){
				rawa="0"+rawa;
				lena=rawa.toString().length;
			}
		}//以上修正输入
	
		var res=callFunc(rawa,rawb); //调用递归函数
	
		return res;
	
	}//用于计算大整数
	
	function removeZero(src) {
		if(src.length==1){
				return src;
			}
		else{
		while("0"==src.toString()[0]){
			
			src=src.slice(1);
		}
		return src;
	}
	}
	function showup () {
		$("#process").show();
		$("#srcoll_up").hide();
		$("#srcoll_down").show();
		$("#shows").slideDown('slow');
	}
	function showdown () {
		$("#process").hide();
		
		$("#srcoll_down").hide();
		$("#srcoll_up").show();
	}
	function startMulti () {
		var st=new Date();
		var na=$("#ina").val();
		var nb=$("#inb").val();
		$("#shows").empty();
		_user_count=0;
		var arglen=na.length;
		_user_radio=Math.pow(2,Math.ceil(Math.log(arglen))+1);

		console.log("arg:"+_user_radio);
		var rr=removeZero(BigMulti(na,nb))

		$("#rest").val(rr);
	
		var fn=new Date();
		var cost=fn.getTime()-st.getTime();
		$("#record>tbody").append("<tr ><td class='item'>"+na.length+"</td><td class='item'>"+cost+" ms</td></tr>")
	}