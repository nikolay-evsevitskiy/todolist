(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{121:function(t,e,a){},122:function(t,e,a){},148:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),o=a(31),s=a.n(o);a(121),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(122);var c,d,r=a(210),l=a(211),u=a(212),j=a(104),b=a(209),f=a(213),h=a(214),O=a(39),m=a(204),p=a(25),g=a(97),x=a.n(g).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"4bd60911-e7ab-47b0-851f-962a07b6cbc2"}}),k=function(){return x.get("todo-lists")},C=function(t){return x.post("todo-lists",{title:t})},v=function(t){return x.delete("todo-lists/".concat(t))},T=function(t,e){return x.put("todo-lists/".concat(t),{title:e})},y=function(t){return x.get("todo-lists/".concat(t,"/tasks"))},I=function(t,e){return x.delete("todo-lists/".concat(t,"/tasks/").concat(e))},A=function(t,e){return x.post("todo-lists/".concat(t,"/tasks"),{title:e})},w=function(t,e,a){return x.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},S=function(t){return x.post("auth/login",t)},L=function(){return x.get("auth/me")},D=function(){return x.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(d||(d={}));var E=function(t,e){t.messages.length?e(H({error:t.messages[0]})):e(H({error:"Some error occurred!"})),e(q({status:"failed"}))},F=function(t,e){e(H({error:t||"Some error occurred?"})),e(q({status:"failed"}))},P=a(33),N=Object(P.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}}}),z=N.reducer,R=N.actions.setIsLoggedInAC,B=Object(P.b)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error},setIsInitializedAC:function(t,e){t.isInitialized=e.payload.isInitialized}}}),M=B.reducer,U=B.actions,q=U.setAppStatusAC,H=U.setAppErrorAC,Z=U.setIsInitializedAC,J=Object(P.b)({name:"todolists",initialState:[],reducers:{clearDataAC:function(t){[]},removeTodolistAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&t.splice(a,1)},addTodolistAC:function(t,e){t.unshift(Object(p.a)(Object(p.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))},changeTodolistTitleAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title},changeTodolistFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter},setTodoListsAC:function(t,e){return e.payload.todoLists.map((function(t){return Object(p.a)(Object(p.a)({},t),{},{filter:"all",entityStatus:"idle"})}))},changeTodolistEntityStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.status}}}),K=J.reducer,W=J.actions,$=W.clearDataAC,_=W.removeTodolistAC,G=W.addTodolistAC,V=W.changeTodolistTitleAC,Y=W.changeTodolistFilterAC,Q=W.setTodoListsAC,X=W.changeTodolistEntityStatusAC,tt=Object(P.b)({name:"tasks",initialState:{},reducers:{removeTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskID}));n>-1&&a.splice(n,1)},addTaskAC:function(t,e){t[e.payload.task.todoListId].unshift(e.payload.task)},updateTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskID}));n>-1&&(a[n]=Object(p.a)(Object(p.a)({},a[n]),e.payload.model))},setTasksAC:function(t,e){t[e.payload.todolistId]=e.payload.tasks}},extraReducers:function(t){t.addCase(G,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(Q,(function(t,e){e.payload.todoLists.forEach((function(e){t[e.id]=[]}))})),t.addCase(nt,(function(t,e){delete t[e.payload.todolistId]})),t.addCase($,(function(t,e){({})}))}}),et=tt.reducer,at=tt.actions,nt=at.removeTaskAC,it=at.addTaskAC,ot=at.setTasksAC,st=at.updateTaskAC,ct=function(t){return function(e){e(q({status:"loading"})),y(t).then((function(a){e(ot({tasks:a.data.items,todolistId:t})),e(q({status:"succeeded"}))})).catch((function(t){F(t.message,e)}))}},dt=function(t,e,a){return function(n,i){var o=i().tasks[e].find((function(e){return e.id===t}));if(o){var s=Object(p.a)({title:o.title,description:o.description,status:o.status,priority:o.priority,startDate:o.startDate,deadline:o.deadline},a);n(q({status:"loading"})),w(e,t,s).then((function(a){0===a.data.resultCode?(n(st({taskID:t,model:s,todolistId:e})),n(q({status:"succeeded"}))):E(a.data,n)})).catch((function(t){F(t.message,n)}))}}},rt=a(29),lt=a(57),ut=a(20),jt=Object(rt.b)({tasks:et,todoLists:K,app:M,auth:z}),bt=Object(P.a)({reducer:jt,middleware:function(t){return t().prepend(lt.a)}}),ft=ut.c;window.store=bt;var ht=a(205),Ot=a(206),mt=a(13),pt=a(197),gt=a(2),xt=i.a.memo((function(t){var e=t.addItem,a=t.disabled,i=void 0!==a&&a;console.log("AddItemForm");var o=Object(n.useState)(""),s=Object(mt.a)(o,2),c=s[0],d=s[1],r=Object(n.useState)(""),l=Object(mt.a)(r,2),u=l[0],j=l[1],b=function(){""!==c.trim()?(e(c),d("")):j("Title is required")};return Object(gt.jsxs)("div",{children:[Object(gt.jsx)(pt.a,{variant:"outlined",value:c,onChange:function(t){d(t.currentTarget.value)},onKeyPress:function(t){null!==u&&j(null),13===t.charCode&&b()},error:!!u,label:"Title",helperText:u,disabled:i}),Object(gt.jsx)(O.a,{color:"primary",onClick:b,disabled:i,children:"+"})]})})),kt=a(105),Ct=i.a.memo((function(t){console.log("EditableSpan called");var e=Object(n.useState)(!1),a=Object(mt.a)(e,2),i=a[0],o=a[1],s=Object(n.useState)(t.value),c=Object(mt.a)(s,2),d=c[0],r=c[1];return i?Object(gt.jsx)(pt.a,{value:d,autoFocus:!0,onBlur:function(){o(!1),t.onChange(d)},onChange:function(t){r(t.currentTarget.value)}}):Object(gt.jsx)("span",{onDoubleClick:function(){t.disabled||(o(!0),r(t.value))},children:t.value})})),vt=a(199),Tt=a(195),yt=i.a.memo((function(t){var e="loading"===t.entityTaskStatus||"loading"===t.entityStatus,a=Object(n.useCallback)((function(e){t.onChangeTaskTitle(t.taskId,t.TodolistId,e)}),[t.onChangeTaskTitle,t.taskId,t.TodolistId]);return Object(gt.jsxs)("div",{className:t.status===c.Completed?"is-done":"",children:[Object(gt.jsx)(vt.a,{checked:t.status===c.Completed,color:"primary",onChange:function(e){var a=e.currentTarget.checked?c.Completed:c.New;t.changeTaskStatus(t.taskId,a,t.TodolistId)},disabled:e}),Object(gt.jsx)(Ct,{value:t.title,onChange:a,disabled:e}),Object(gt.jsx)(O.a,{onClick:function(){t.removeTask(t.taskId,"loading",t.TodolistId)},disabled:e,children:Object(gt.jsx)(Tt.a,{})})]},t.taskId)})),It=["demo"],At=i.a.memo((function(t){t.demo;var e=Object(kt.a)(t,It);console.log("Todolist called");var a=Object(n.useCallback)((function(t){e.addTask(t,e.todolist.id)}),[e.addTask,e.todolist.id]),i=Object(n.useCallback)((function(){e.filterTasks("all",e.todolist.id)}),[e.filterTasks,e.todolist.id]),o=Object(n.useCallback)((function(){e.filterTasks("active",e.todolist.id)}),[e.filterTasks,e.todolist.id]),s=Object(n.useCallback)((function(){e.filterTasks("completed",e.todolist.id)}),[e.filterTasks,e.todolist.id]),d=Object(n.useCallback)((function(t){e.onChangeTodolistTitle(e.todolist.id,t)}),[e.onChangeTodolistTitle,e.todolist.id]),r=e.tasks;return"active"===e.todolist.filter&&(r=e.tasks.filter((function(t){return t.status===c.New}))),"completed"===e.todolist.filter&&(r=e.tasks.filter((function(t){return t.status===c.Completed}))),Object(gt.jsxs)("div",{className:"Block",children:[Object(gt.jsxs)("h3",{children:[Object(gt.jsx)(Ct,{value:e.todolist.title,onChange:d,disabled:"loading"===e.todolist.entityStatus}),Object(gt.jsx)(O.a,{onClick:function(){e.removeTodolist(e.todolist.id)},disabled:"loading"===e.todolist.entityStatus,children:Object(gt.jsx)(Tt.a,{})})]}),Object(gt.jsx)(xt,{addItem:a,disabled:"loading"===e.todolist.entityStatus}),Object(gt.jsx)("div",{children:r.map((function(t){return Object(gt.jsx)(gt.Fragment,{children:Object(gt.jsx)(yt,{taskId:t.id,TodolistId:e.todolist.id,status:t.status,title:t.title,removeTask:e.removeTask,changeTaskStatus:e.changeTaskStatus,onChangeTaskTitle:e.onChangeTaskTitle,entityStatus:e.todolist.entityStatus,entityTaskStatus:t.entityTaskStatus},t.id)})}))}),Object(gt.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(gt.jsx)(m.a,{variant:"all"===e.todolist.filter?"contained":"text",color:"inherit",onClick:i,children:"All"}),Object(gt.jsx)(m.a,{variant:"active"===e.todolist.filter?"contained":"text",color:"primary",onClick:o,children:"Active"}),Object(gt.jsx)(m.a,{variant:"completed"===e.todolist.filter?"contained":"text",color:"secondary",onClick:s,children:"Completed"})]})]})})),wt=a(14),St=function(t){var e=t.demo,a=void 0!==e&&e,i=ft((function(t){return t.todoLists})),o=ft((function(t){return t.tasks})),s=Object(ut.c)((function(t){return t.auth.isLoggedIn})),c=Object(ut.b)();Object(n.useEffect)((function(){!a&&s&&c((function(t){t(q({status:"loading"})),k().then((function(e){return t(Q({todoLists:e.data})),t(q({status:"succeeded"})),e.data})).then((function(e){e.forEach((function(e){t(ct(e.id))}))})).catch((function(e){F(e.message,t)}))}))}),[]);var d=Object(n.useCallback)((function(t){c(function(t){return function(e){e(q({status:"loading"})),C(t).then((function(t){0===t.data.resultCode?(e(G({todolist:t.data.data.item})),e(q({status:"succeeded"}))):E(t.data,e)})).catch((function(t){F(t.message,e)}))}}(t))}),[c]),r=Object(n.useCallback)((function(t,e){c(function(t,e){return function(a){a(q({status:"loading"})),A(t,e).then((function(t){0===t.data.resultCode?(a(it({task:t.data.data.item})),a(q({status:"succeeded"}))):E(t.data,a)})).catch((function(t){F(t.message,a)}))}}(e,t))}),[c]),l=Object(n.useCallback)((function(t,e,a){c(function(t,e,a){return function(n){n(q({status:"loading"})),n(st({taskID:t,model:e,todolistId:a})),I(a,t).then((function(){n(nt({taskID:t,todolistId:a})),n(q({status:"succeeded"}))})).catch((function(t){F(t.message,n)}))}}(t,{entityTaskStatus:e},a))}),[c]),u=Object(n.useCallback)((function(t){var e;c((e=t,function(t){t(q({status:"loading"})),t(X({id:e,status:"loading"})),v(e).then((function(){t(_({todolistId:e})),t(q({status:"succeeded"}))})).catch((function(e){F(e.message,t)}))}))}),[c]),j=Object(n.useCallback)((function(t,e,a){c(dt(t,a,{status:e}))}),[c]),b=Object(n.useCallback)((function(t,e){var a=Y({id:e,filter:t});c(a)}),[c]),f=Object(n.useCallback)((function(t,e,a){c(dt(t,e,{title:a}))}),[c]),h=Object(n.useCallback)((function(t,e){var a,n;c((a=t,n=e,function(t){t(q({status:"loading"})),T(a,n).then((function(e){0===e.data.resultCode?(t(V({id:a,title:n})),t(q({status:"succeeded"}))):E(e.data,t)})).catch((function(e){F(e.message,t)}))}))}),[c]);return s?Object(gt.jsxs)(gt.Fragment,{children:[Object(gt.jsx)(ht.a,{container:!0,style:{padding:"20px"},children:Object(gt.jsx)(xt,{addItem:d})}),Object(gt.jsx)(ht.a,{container:!0,spacing:3,children:i.map((function(t){var e=o[t.id];return Object(gt.jsx)(ht.a,{item:!0,children:Object(gt.jsx)(Ot.a,{style:{padding:"10px"},children:Object(gt.jsx)(At,{todolist:t,tasks:e,removeTask:l,removeTodolist:u,filterTasks:b,addTask:r,changeTaskStatus:j,onChangeTaskTitle:f,onChangeTodolistTitle:h,demo:a},t.id)})},t.id)}))})]}):Object(gt.jsx)(wt.a,{to:"login"})},Lt=a(196),Dt=a(201),Et=a(200),Ft=n.forwardRef((function(t,e){return Object(gt.jsx)(Et.a,Object(p.a)({elevation:6,ref:e,variant:"filled"},t))}));function Pt(){var t=Object(ut.c)((function(t){return t.app.error})),e=Object(ut.b)(),a=function(t,a){"clickaway"!==a&&e(H({error:null}))};return Object(gt.jsx)(Lt.a,{spacing:2,sx:{width:"100%"},children:Object(gt.jsx)(Dt.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(gt.jsx)(Ft,{onClose:a,severity:"error",sx:{width:"100%"},children:t})})})}var Nt=a(202),zt=a(208),Rt=a(207),Bt=a(193),Mt=a(103),Ut=function(){var t=Object(ut.b)(),e=Object(ut.c)((function(t){return t.auth.isLoggedIn})),a=Object(Mt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<2&&(e.password="Invalid password address"):e.password="Required",e},onSubmit:function(e){var n;t((n=e,function(t){t(q({status:"loading"})),S(n).then((function(e){0===e.data.resultCode?t(R({value:!0})):E(e.data,t)})).catch((function(e){F(e.message,t)})).finally((function(){t(q({status:"succeeded"}))}))})),a.resetForm()}});return e?Object(gt.jsx)(wt.a,{to:"/"}):Object(gt.jsx)(ht.a,{container:!0,justifyContent:"center",children:Object(gt.jsx)(ht.a,{item:!0,justifyContent:"center",children:Object(gt.jsxs)(Nt.a,{children:[Object(gt.jsxs)(Bt.a,{children:[Object(gt.jsxs)("p",{children:["To log in get registered",Object(gt.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(gt.jsx)("p",{children:"or use common test account credentials:"}),Object(gt.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(gt.jsx)("p",{children:"Password: free"})]}),Object(gt.jsx)("form",{onSubmit:a.handleSubmit,children:Object(gt.jsxs)(Rt.a,{children:[Object(gt.jsx)(pt.a,Object(p.a)({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(gt.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(gt.jsx)(pt.a,Object(p.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&Object(gt.jsx)("div",{style:{color:"red"},children:a.errors.password}),Object(gt.jsx)(zt.a,{label:"Remember me",control:Object(gt.jsx)(vt.a,Object(p.a)({},a.getFieldProps("rememberMe")))}),Object(gt.jsx)(m.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})]})})})},qt=function(t){var e=t.demo,a=void 0!==e&&e,i=Object(ut.c)((function(t){return t.app.status})),o=Object(ut.c)((function(t){return t.app.isInitialized})),s=Object(ut.c)((function(t){return t.auth.isLoggedIn})),c=Object(ut.b)();Object(n.useEffect)((function(){c((function(t){L().then((function(e){0===e.data.resultCode&&t(R({value:!0}))})).finally((function(){t(Z({isInitialized:!0}))}))}))}),[c]);var d=Object(n.useCallback)((function(){c((function(t){t(q({status:"loading"})),D().then((function(e){0===e.data.resultCode?(t(R({value:!1})),t($()),t(q({status:"succeeded"}))):E(e.data,t)})).catch((function(e){F(e.message,t)}))}))}),[c]);if(!o)return Object(gt.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(gt.jsx)(r.a,{})});return Object(gt.jsxs)("div",{className:"App",children:[Object(gt.jsx)(Pt,{}),Object(gt.jsxs)(l.a,{position:"static",color:"primary",children:[Object(gt.jsxs)(u.a,{children:[Object(gt.jsx)(O.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(gt.jsx)(j.a,{open:!1})}),Object(gt.jsx)(b.a,{variant:"h6",color:"inherit",component:"div",children:"To Do List"}),s&&Object(gt.jsx)("div",{children:Object(gt.jsx)(m.a,{color:"warning",onClick:d,children:"log out"})})]}),"loading"===i&&Object(gt.jsx)(f.a,{color:"secondary"})]}),Object(gt.jsx)(h.a,{fixed:!0,children:Object(gt.jsxs)(wt.d,{children:[Object(gt.jsx)(wt.b,{path:"/",element:Object(gt.jsx)(St,{demo:a})}),Object(gt.jsx)(wt.b,{path:"login",element:Object(gt.jsx)(Ut,{})}),Object(gt.jsx)(wt.b,{path:"*",element:Object(gt.jsx)(wt.a,{to:"/404"})}),Object(gt.jsx)(wt.b,{path:"/404",element:Object(gt.jsx)("h1",{children:"404: PAGE NOT FOUND"})})]})})]})};var Ht=a(55);s.a.render(Object(gt.jsx)(ut.a,{store:bt,children:Object(gt.jsx)(Ht.a,{children:Object(gt.jsx)(qt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[148,1,2]]]);
//# sourceMappingURL=main.9ff62880.chunk.js.map