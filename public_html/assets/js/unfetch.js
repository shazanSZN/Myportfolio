// self.fetch||(self.fetch=function(e,n){return n=n||{},new Promise(function(t,s){var
//
//     r=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(r.status/100|0),statusText:r.statusText
//         ,status:r.status,url:r.responseURL,text:function(){return Promise.resolve(r.responseText)},
//         json:function(){return Promise.resolve(r.responseText).then(JSON.parse)},blob:function(){return Pr
//             omise.resolve(new Blob([r.response]))},clone:a,headers:{keys:function(){return o},entries
//
//     :function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return
//             e.toLowerCase()in i}}}};for(var c in r.open(n.method||"get",e,!0),r.onload=function(){r.g
//     etAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},r.onerror=s,r.withCredentials="include"==n.credentials,n.headers)r.setRequestHeader(c,n.headers[c]);r.send(n.body||null)})});
