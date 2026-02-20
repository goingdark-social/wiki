import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as b}from"./index.DiEladB3.js";import{c}from"./createLucideIcon.DdYR_W5z.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],v=c("chevron-right",f);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],j=c("file-text",g);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],$=c("folder-open",N);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],y=c("folder",k);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],M=c("house",H);function C({navigation:a,currentPath:i,isHome:n,prefix:r=""}){return e.jsxs("div",{className:"space-y-2",children:[e.jsxs("a",{href:"/",className:`sidebar-item ${n?"sidebar-item-active":"sidebar-item-inactive"}`,"aria-current":n?"page":void 0,children:[e.jsx(M,{size:18,className:"sidebar-item-icon","aria-hidden":"true"}),e.jsx("span",{children:"Wiki Home"})]}),e.jsxs("div",{className:"sidebar-docs-label",children:[e.jsx(j,{size:16,className:"sidebar-docs-icon","aria-hidden":"true"}),e.jsx("span",{className:"sidebar-docs-title",children:"Documentation"})]}),e.jsx("nav",{className:"sidebar-nav","aria-label":"Documentation sections",children:a.map(o=>e.jsx(m,{node:o,currentPath:i,level:0,prefix:r},o.slug))})]})}function m({node:a,currentPath:i,level:n,prefix:r}){const o=a.children.length>0,t=i===a.slug||i===`${a.slug}/index`,l=i.startsWith(a.slug+"/")&&!t,[x,u]=b.useState(!1),d=x||l||t;return o?e.jsxs("div",{children:[e.jsxs("button",{type:"button",onClick:()=>u(!d),className:`sidebar-folder-header ${t?"sidebar-folder-header-active":l?"sidebar-folder-header-parent":"sidebar-folder-header-inactive"}`,"aria-expanded":d,"aria-controls":`${r}folder-children-${a.slug}`,children:[e.jsx(v,{size:16,className:`sidebar-folder-arrow ${d?"sidebar-folder-arrow-open":""}`,"aria-hidden":"true"}),e.jsx("div",{className:`sidebar-folder-icon ${t?"sidebar-folder-icon-active":l?"sidebar-folder-icon-parent":"sidebar-folder-icon-inactive"}`,"aria-hidden":"true",children:d?e.jsx($,{size:16,className:t||l?"text-text-white":"text-text-muted"}):e.jsx(y,{size:16,className:t||l?"text-text-white":"text-text-muted"})}),e.jsx("span",{className:"flex-1 text-left font-semibold",children:a.title})]}),d&&e.jsx("div",{id:`${r}folder-children-${a.slug}`,className:"sidebar-folder-children",role:"group","aria-label":`${a.title} pages`,children:a.children.filter(s=>!s.slug.endsWith("/index")).map(s=>{const h=i===s.slug,p=i.startsWith(s.slug+"/")&&!h;return s.children.length>0?e.jsx(m,{node:s,currentPath:i,level:n+1,prefix:r},s.slug):e.jsx("a",{href:`/docs/${s.slug}`,className:`sidebar-child-item ${h?"sidebar-child-item-active":p?"sidebar-child-item-parent":"sidebar-child-item-inactive"}`,"aria-current":h?"page":void 0,children:e.jsx("span",{className:"flex-1 text-sm",children:s.title})},s.slug)})})]}):e.jsx("a",{href:`/docs/${a.slug}`,className:`sidebar-item ${t?"sidebar-item-active":"sidebar-item-inactive"}`,"aria-current":t?"page":void 0,children:e.jsx("span",{className:"flex-1",children:a.title})})}export{C as SidebarTree};
