(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b593a0a"],{"0863":function(e,t,a){"use strict";a("3fd5")},"0b68":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return s}));var r=a("f25d");function i(e){return Object(r["a"])({url:"analysis/",params:{name:e},method:"get"})}function o(e){return Object(r["a"])({url:"analysis/",data:{flag:e},method:"post"})}function s(e){return Object(r["a"])({url:"analysis/",params:{name:e},method:"put"})}},"3fd5":function(e,t,a){},"59ac":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return s})),a.d(t,"d",(function(){return n})),a.d(t,"e",(function(){return u}));var r=a("f25d");function i(e,t){return Object(r["a"])({url:"classrooms/",params:{page:e,size:t},method:"get"})}function o(){return Object(r["a"])({url:"classrooms/",method:"put"})}function s(e){return Object(r["a"])({url:"classrooms/",data:{form:e},method:"post"})}function n(e,t){return Object(r["a"])({url:"classrooms/",params:{id:e,op:t},method:"delete"})}function u(){return Object(r["a"])({url:"ManagerSorting/"})}},ac6a:function(e,t,a){for(var r=a("cadf"),i=a("0d58"),o=a("2aba"),s=a("7726"),n=a("32e9"),u=a("84f2"),c=a("2b4c"),l=c("iterator"),d=c("toStringTag"),h=u.Array,m={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=i(m),p=0;p<f.length;p++){var y,b=f[p],v=m[b],g=s[b],S=g&&g.prototype;if(S&&(S[l]||n(S,l,h),S[d]||n(S,d,b),u[b]=h,v))for(y in r)S[y]||o(S,y,r[y],!0)}},ca03:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("div",{staticStyle:{position:"relative",width:"80vw",height:"85vh",top:"-120px"}},[a("div",{ref:"bar",attrs:{id:"bar"}}),a("div",{ref:"pie",attrs:{id:"pie"}}),a("div",{ref:"gauge",attrs:{id:"gauge"}}),a("div",{attrs:{id:"qualified"}},[e._v("班级合格率")])]),a("div",{attrs:{id:"select"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.loadClass},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)])},i=[],o=(a("ac6a"),a("313e")),s=a("0b68"),n=a("59ac"),u={name:"data-analysis",created:function(){var e=this,t=[];if(0===this.$store.state.classList.length){var a={};Object(n["c"])().then((function(r){r.forEach((function(e,r,i){a["value"]=e["c_name"],a["id"]=e["id"],t.push(a),a={}})),e.value=e.options[0]["value"],Object(s["a"])(e.value).then((function(t){e.qualified=t.qualified,e.rate=t.rate,e.showScore=t.score,e.coursera=t.courseraName,e.studentName=t.studentName,console.log(e.coursera),setTimeout((function(){e.drawBar(),e.drawPie(),e.drawGauge()}),1200)}))})),this.options=t}else this.options=this.$store.state.classList,this.value=this.options[0]["value"],Object(s["a"])(this.value).then((function(t){e.coursera=t.courseraName,e.showScore=t.score,e.rate=t.rate,e.qualified=t.qualified,e.studentName=t.studentName,console.log(e.coursera),setTimeout((function(){e.drawBar(),e.drawPie(),e.drawGauge()}),1200)}))},mounted:function(){},data:function(){return{rate:[],coursera:[],studentName:[],showScore:[],qualified:"",options:[],value:""}},methods:{loadClass:function(e){var t=this;Object(s["a"])(e).then((function(e){t.coursera=e.courseraName,t.qualified=e.qualified,t.showScore=e.score,t.rate=e.rate,t.studentName=e.studentName,console.log(t.showScore),t.drawBar(),t.drawPie(),t.drawGauge()}))},drawBar:function(){var e=o["b"](this.$refs.bar),t={title:{text:"班级前五名",textStyle:{color:"#2b2b2b",fontStyle:"normal",fontSize:12}},xAxis:{type:"category",data:this.studentName,boundaryGap:!0},yAxis:{type:"value",scale:!0},tooltip:{trigger:"item"},toolbox:{feature:{saveAsImage:{},restore:{},dataView:{},dataZoom:{},magicType:{type:["bar","line"]}}},legend:{data:this.coursera},series:[{type:"bar",name:this.coursera[0],data:this.showScore["s0"],label:{show:!0},markPoint:{data:[{type:"max",name:this.coursera[0]+"最高分"},{type:"min",name:this.coursera[0]+"最低分"}]},markLine:{data:[{type:"average",name:this.coursera[0]+"平均分"}]},smooth:!0},{type:"bar",name:this.coursera[1],data:this.showScore["s1"],label:{show:!0},markPoint:{data:[{type:"max",name:this.coursera[1]+"最高分"},{type:"min",name:this.coursera[1]+"最低分"}]},smooth:!0,markLine:{data:[{type:"average",name:this.coursera[1]+"平均分"}]}},{type:"bar",name:this.coursera[2],data:this.showScore["s2"],label:{show:!0,rotate:45,position:"top"},markPoint:{data:[{type:"max",name:this.coursera[2]+"最高分"},{type:"min",name:this.coursera[2]+"最低分"}]},smooth:!0,markLine:{data:[{type:"average",name:this.coursera[2]+"平均分"}]}},{type:"bar",name:this.coursera[3],data:this.showScore["s3"],label:{show:!0,rotate:45,position:"top"},markPoint:{data:[{type:"max",name:this.coursera[3]+"最高分"},{type:"min",name:this.coursera[3]+"最低分"}]},smooth:!0,markLine:{data:[{type:"average",name:this.coursera[3]+"平均分"}]}},{type:"bar",name:this.coursera[4],data:this.showScore["s4"],label:{show:!0,rotate:45,position:"top"},markPoint:{data:[{type:"max",name:this.coursera[4]+"最高分"},{type:"min",name:this.coursera[4]+"最低分"}]},smooth:!0,markLine:{data:[{type:"average",name:this.coursera[4]+"平均分"}]}},{type:"bar",name:this.coursera[5],data:this.showScore["s5"],label:{show:!0,rotate:45,position:"top"},markPoint:{data:[{type:"max",name:this.coursera[5]+"最高分"},{type:"min",name:this.coursera[5]+"最低分"}]},smooth:!0,markLine:{data:[{type:"average",name:this.coursera[5]+"平均分"}]}}]};e.setOption(t)},drawPie:function(){var e=o["b"](this.$refs.pie),t={title:{text:"班级成绩分析"},series:[{type:"pie",data:[{value:this.rate[0],name:this.coursera[0]},{value:this.rate[1],name:this.coursera[1]},{value:this.rate[2],name:this.coursera[2]},{value:this.rate[3],name:this.coursera[3]},{value:this.rate[4],name:this.coursera[4]}],roseType:"area"}]};e.setOption(t)},drawGauge:function(){var e=o["b"](this.$refs.gauge),t={series:[{type:"gauge",startAngle:180,endAngle:0,min:0,max:1,splitNumber:8,axisLine:{lineStyle:{width:6,color:[[.25,"#FF6E76"],[.5,"#FDDD60"],[.75,"#58D9F9"],[1,"#7CFFB2"]]}},pointer:{icon:"path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",length:"12%",width:20,offsetCenter:[0,"-60%"],itemStyle:{color:"auto"}},axisTick:{length:12,lineStyle:{color:"auto",width:2}},splitLine:{length:20,lineStyle:{color:"auto",width:5}},axisLabel:{color:"#464646",fontSize:20,distance:-60,formatter:function(e){return.875===e?"A":.625===e?"B":.375===e?"C":.125===e?"D":""}},title:{offsetCenter:[0,"-20%"],fontSize:30,text:"合格率"},detail:{fontSize:30,offsetCenter:[0,"0%"],valueAnimation:!0,formatter:function(e){return Math.round(100*e)+"%"},color:"auto"},data:[{value:this.qualified}]}]};e.setOption(t)}}},c=u,l=(a("0863"),a("2877")),d=Object(l["a"])(c,r,i,!1,null,"2618e29d",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-6b593a0a.be1c6e85.js.map