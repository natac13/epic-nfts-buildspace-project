(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{771:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var a=n(266),i=n(6311),r=n(809),s=n.n(r),o=n(4065),u=n(1508),p=n(2658),l=n(5329),d=n(9062),c=n(7957),y=n(7294),m=n(387),f=n(5755),T=JSON.parse('{"Mt":[{"inputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"NewEpicNFTMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalNFTsMined","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"makeAnEpicNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"pickRandomColor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"pickRandomFirstWord","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"pickRandomSecondWord","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"pickRandomThirdWord","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]}'),b=n(5893),h=("https://twitter.com/".concat("_buildspace"),"0x5FbDB2315678afecb367f032d93F642f64180aa3");function v(){var e=y.useState(""),t=(0,i.Z)(e,2),n=t[0],r=t[1],v=y.useState(!1),w=(0,i.Z)(v,2),x=w[0],g=w[1],k=y.useState(0),M=(0,i.Z)(k,2),Z=M[0],j=M[1],F=function(){var e=(0,a.Z)(s().mark((function e(){var t,n,a,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{t=window,(n=t.ethereum)?(a=new f.Q(n),i=a.getSigner(),new m.CH(h,T.Mt,i).on("NewEpicNFTMinted",(function(e,t){console.log(e,t.toNumber()),j((function(e){return 1+(null===t||void 0===t?void 0:t.toNumber())}))})),console.log("Setup event listener!")):console.log("Ethereum object doesn't exist!")}catch(r){console.log(r)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=(0,a.Z)(s().mark((function e(){var t,n,a,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,n=t.ethereum){e.next=7;break}return console.log("Make sure you have metamask!"),e.abrupt("return");case 7:console.log("We have the ethereum object",n);case 8:return e.next=10,n.request({method:"eth_accounts"});case 10:0!==(a=e.sent).length?(i=a[0],console.log("Found an authorized account:",i),r(i),F()):console.log("No authorized account found"),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=(0,a.Z)(s().mark((function e(){var t,n,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,n=t.ethereum){e.next=5;break}return alert("Get MetaMask!"),e.abrupt("return");case 5:return console.log("heelo"),e.next=8,n.request({method:"eth_requestAccounts"});case 8:a=e.sent,console.log("Connected",a[0]),r(a[0]),F(),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=(0,a.Z)(s().mark((function e(){var t,n,a,i,r,o;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,n=t.ethereum,console.log("??"),!n){e.next=19;break}return a=new f.Q(n),i=a.getSigner(),r=new m.CH(h,T.Mt,i),console.log("Going to pop wallet now to pay gas..."),e.next=10,r.makeAnEpicNFT();case 10:return o=e.sent,g(!0),console.log("Mining...please wait."),e.next=15,o.wait();case 15:g(!1),console.log("Mined, see transaction: https://rinkeby.etherscan.io/tx/".concat(o.hash)),e.next=20;break;case 19:console.log("Ethereum object doesn't exist!");case 20:e.next=25;break;case 22:e.prev=22,e.t0=e.catch(0),console.log(e.t0);case 25:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=(0,a.Z)(s().mark((function e(){var t,n,a,i,r,o;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window,n=t.ethereum){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,a=new f.Q(n),i=a.getSigner(),r=new m.CH(h,T.Mt,i),e.next=9,r.getTotalNFTsMined();case 9:o=e.sent,j(null===o||void 0===o?void 0:o.toNumber()),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log({error:e.t0});case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(){return e.apply(this,arguments)}}();return y.useEffect((function(){N()}),[]),(0,b.jsxs)(o.Z,{maxWidth:"md",children:[(0,b.jsxs)(u.Z,{component:"header",sx:{display:"flex",justifyContent:"center",alignItems:"center",flexFlow:"column",my:2},children:[(0,b.jsx)(p.Z,{variant:"h1",align:"center",fontWeight:"700",children:"Epic NFTs"}),(0,b.jsxs)(p.Z,{variant:"h5",align:"center",fontWeight:"700",children:["Total Mined: ",Z]}),n&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p.Z,{variant:"h6",children:"Account"}),(0,b.jsx)(p.Z,{variant:"subtitle1",children:n})]})]}),(0,b.jsxs)(u.Z,{sx:{my:3,display:"flex",width:"100%",justifyContent:"center",flexFlow:"column",gap:2},children:[(0,b.jsx)(l.Z,{in:!!n,children:(0,b.jsxs)(u.Z,{display:"flex",flexDirection:"column",gap:3,children:[(0,b.jsx)(c.Z,{variant:"contained",color:"primary",onClick:C,children:"Get Mined NFT Count"}),(0,b.jsx)(c.Z,{variant:"contained",color:"secondary",onClick:_,children:"Mint NFT"})]})}),(0,b.jsx)(l.Z,{in:!n,children:(0,b.jsx)(c.Z,{color:"primary",variant:"outlined",onClick:I,disabled:x,children:"Connect Wallet"})})]}),x&&(0,b.jsxs)(u.Z,{sx:{display:"flex",flexFlow:"column",width:"100%",alignItems:"center",justifyContent:"center"},children:[(0,b.jsx)(p.Z,{variant:"subtitle1",align:"center",children:"Pending Transaction"}),(0,b.jsx)(d.Z,{color:"secondary",size:50})]})]})}},5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(771)}])},6601:function(){}},function(e){e.O(0,[539,774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);