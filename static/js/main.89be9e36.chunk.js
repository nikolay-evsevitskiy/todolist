(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{71:function(e,t,a){e.exports=a(84)},76:function(e,t,a){},77:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(27),r=a.n(c),o=(a(76),a(13)),l=a(5),u=a(28),d=a(14),s=(a(77),a(121)),f=a(128);function m(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(""),u=Object(o.a)(l,2),d=u[0],m=u[1],v=function(){""!==c.trim()?(e.addItem(c),r("")):m("Title is required")};return i.a.createElement("div",null,i.a.createElement(s.a,{variant:"outlined",value:c,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(e){m(null),13===e.charCode&&v()},error:!!d,label:"Title",helperText:d}),i.a.createElement(f.a,{color:"primary",onClick:v},"+"))}function v(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(e.value),u=Object(o.a)(l,2),d=u[0],f=u[1];return c?i.a.createElement(s.a,{variant:"outlined",value:d,autoFocus:!0,onBlur:function(){r(!1),e.onChange(d)},onChange:function(e){f(e.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){r(!0),f(e.value)}},e.value)}var b=a(123),j=a(129),E=a(118);function O(e){return i.a.createElement("div",{className:"Block"},i.a.createElement("h3",null,i.a.createElement(v,{value:e.title,onChange:function(t){e.onChangeTodolistTitle(e.id,t)}}),i.a.createElement(f.a,{onClick:function(){e.removeTodolist(e.id)}},i.a.createElement(E.a,null))),i.a.createElement(m,{addItem:function(t){e.addTask(t,e.id)}}),i.a.createElement("div",null,e.tasks.map((function(t){return i.a.createElement("div",{key:t.id,className:t.isDone?"is-done":""},i.a.createElement(b.a,{checked:t.isDone,color:"primary",onChange:function(a){var n=a.currentTarget.checked;e.changeTaskStatus(t.id,n,e.id)}}),i.a.createElement(v,{value:t.title,onChange:function(a){e.onChange(t.id,e.id,a)}}),i.a.createElement(f.a,{onClick:function(){e.removeTask(t.id,e.id)}},i.a.createElement(E.a,null)))}))),i.a.createElement("div",null,i.a.createElement(j.a,{variant:"all"===e.filter?"contained":"text",color:"inherit",onClick:function(){e.filterTasks("all",e.id)}},"All"),i.a.createElement(j.a,{variant:"active"===e.filter?"contained":"text",color:"primary",onClick:function(){e.filterTasks("active",e.id)}},"Active"),i.a.createElement(j.a,{variant:"completed"===e.filter?"contained":"text",color:"secondary",onClick:function(){e.filterTasks("completed",e.id)}},"Completed")))}var h=a(124),k=a(130),p=a(131),g=a(132),T=a(133),C=a(126),D=a(127),y=a(119);var S=function(){var e;function t(e,t){var a={id:Object(h.a)(),title:e,isDone:!1},n=N[t];N[t]=[a].concat(Object(d.a)(n)),W(Object(u.a)({},N))}function a(e,t){var a=N[t];N[t]=a.filter((function(t){return t.id!==e})),W(Object(u.a)({},N))}function c(e){I(B.filter((function(t){return t.id!==e}))),delete N[e],W(Object(u.a)({},N))}function r(e,t,a){var n=N[a].find((function(t){return t.id===e}));n&&(n.isDone=t,W(Object(u.a)({},N)))}function s(e,t){var a=B.find((function(e){return e.id===t}));a&&(a.filter=e,I(Object(d.a)(B)))}function v(e,t,a){var n=N[t].find((function(t){return t.id===e}));n&&(n.title=a,W(Object(u.a)({},N)))}function b(e,t){var a=B.find((function(t){return t.id===e}));a&&(a.title=t,I(Object(d.a)(B)))}var E=Object(h.a)(),S=Object(h.a)(),w=Object(n.useState)([{id:E,title:"What to learn",filter:"all"},{id:S,title:"What to bye",filter:"all"}]),x=Object(o.a)(w,2),B=x[0],I=x[1],A=Object(n.useState)((e={},Object(l.a)(e,E,[{id:Object(h.a)(),title:"HTML&CSS",isDone:!0},{id:Object(h.a)(),title:"JS",isDone:!0},{id:Object(h.a)(),title:"ReactJS",isDone:!1},{id:Object(h.a)(),title:"Rest API",isDone:!1},{id:Object(h.a)(),title:"Graph QL",isDone:!1}]),Object(l.a)(e,S,[{id:Object(h.a)(),title:"Milk",isDone:!0},{id:Object(h.a)(),title:"React Book",isDone:!0}]),e)),J=Object(o.a)(A,2),N=J[0],W=J[1];return i.a.createElement("div",{className:"App"},i.a.createElement(k.a,{position:"static"},i.a.createElement(p.a,{variant:"dense"},i.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(y.a,null)),i.a.createElement(g.a,{variant:"h6",color:"inherit",component:"div"},"News"),i.a.createElement(j.a,{color:"inherit"},"Login"))),i.a.createElement(T.a,{fixed:!0},i.a.createElement(C.a,{container:!0,style:{padding:"20px"}},i.a.createElement(m,{addItem:function(e){var t=Object(h.a)();I([{id:t,title:e,filter:"all"}].concat(Object(d.a)(B))),W(Object(u.a)(Object(u.a)({},N),{},Object(l.a)({},t,[])))}})),i.a.createElement(C.a,{container:!0,spacing:3},B.map((function(e){var n=N[e.id],o=n;return"active"===e.filter&&(o=n.filter((function(e){return!e.isDone}))),"completed"===e.filter&&(o=n.filter((function(e){return e.isDone}))),i.a.createElement(C.a,{item:!0},i.a.createElement(D.a,{style:{padding:"10px"}},i.a.createElement(O,{key:e.id,id:e.id,title:e.title,tasks:o,removeTask:a,removeTodolist:c,filterTasks:s,addTask:t,changeTaskStatus:r,filter:e.filter,onChange:v,onChangeTodolistTitle:b})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.89be9e36.chunk.js.map