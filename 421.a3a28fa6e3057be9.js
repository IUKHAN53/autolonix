"use strict";(self.webpackChunkautolonix_frontend=self.webpackChunkautolonix_frontend||[]).push([[421],{3421:(y,s,n)=>{n.r(s),n.d(s,{CreateCategoryModule:()=>m});var c=n(6814),C=n(5906),e=n(4946),p=n(8523),i=n(228),a=n(95);const u=[{path:"",component:(()=>{class t{constructor(o,r){this.httpService=o,this.router=r,this.categoryModel={drilldown_code:"",drilldown_description:""}}saveCategory(o){o.preventDefault(),this.httpService.requestCall("categories",C.p.POST,this.categoryModel).subscribe({next:r=>{this.router.navigate(["/category/all"]).then(g=>window.location.reload())},error:r=>console.error(r.error),complete:()=>console.log("Observer got a complete notification")})}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(p.O),e.Y36(i.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-create-category"]],decls:21,vars:2,consts:[[1,"content-panel"],[1,"content-box"],[1,"form-section"],[1,"section-30",3,"submit"],["type","text","placeholder","Category Code","name","drilldown_code",2,"width","100% !important",3,"ngModel","ngModelChange"],["rows","5","name","drilldown_description","placeholder","Category Description",2,"width","100% !important",3,"ngModel","ngModelChange"],["type","file","placeholder","Category Image",2,"width","100% !important"],[1,"form-footer"],["routerLink","/category/all"],[1,"btn-cancel"],["type","submit",1,"btn-save"]],template:function(o,r){1&o&&(e.TgZ(0,"div",0)(1,"h2"),e._uU(2,"Create New Category"),e.qZA(),e.TgZ(3,"div",1)(4,"div",2)(5,"form",3),e.NdJ("submit",function(l){return r.saveCategory(l)}),e.TgZ(6,"p"),e._uU(7,"Category Code"),e.qZA(),e.TgZ(8,"input",4),e.NdJ("ngModelChange",function(l){return r.categoryModel.drilldown_code=l}),e.qZA(),e.TgZ(9,"p"),e._uU(10,"Category Description"),e.qZA(),e.TgZ(11,"textarea",5),e.NdJ("ngModelChange",function(l){return r.categoryModel.drilldown_description=l}),e.qZA(),e.TgZ(12,"p"),e._uU(13,"Category Image"),e.qZA(),e._UZ(14,"input",6),e.TgZ(15,"div",7)(16,"a",8)(17,"button",9),e._uU(18,"Back to list"),e.qZA()(),e.TgZ(19,"button",10),e._uU(20,"Save"),e.qZA()()()()()()),2&o&&(e.xp6(8),e.Q6J("ngModel",r.categoryModel.drilldown_code),e.xp6(3),e.Q6J("ngModel",r.categoryModel.drilldown_description))},dependencies:[a._Y,a.Fj,a.JJ,a.JL,a.On,a.F,i.rH]}),t})()}];let m=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[c.ez,a.u5,i.Bz.forChild(u)]}),t})()}}]);