(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{422:function(t,s,r){t.exports=r.p+"assets/img/HTTP-actual-process-1.6370b3a1.jpg"},423:function(t,s,r){t.exports=r.p+"assets/img/http-actual-process-2.64c3c9b0.png"},424:function(t,s,r){t.exports=r.p+"assets/img/http-actual-process-3.e0d278f0.png"},498:function(t,s,r){"use strict";r.r(s);var a=r(27),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"脑图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#脑图"}},[t._v("#")]),t._v(" 脑图")]),t._v(" "),a("p",[a("img",{attrs:{src:r(422),alt:"HTTP 运作过程"}})]),t._v(" "),a("h2",{attrs:{id:"搭建本地测试环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建本地测试环境"}},[t._v("#")]),t._v(" 搭建本地测试环境")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("通过 openresty 搭建本地 web 服务器")])]),t._v(" "),a("li",[a("p",[t._v("配置本地 hosts DNS 映射")])]),t._v(" "),a("li",[a("p",[t._v("通过 wireshark 抓包")])])]),t._v(" "),a("h2",{attrs:{id:"图解-http-过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#图解-http-过程"}},[t._v("#")]),t._v(" 图解 HTTP 过程")]),t._v(" "),a("ol",[a("li",[t._v("最基本的 HTTP 过程（这里没有描述 DNS 查询过程，如果使用域名访问网址，那么第一步就是 DNS 查询）\n"),a("img",{attrs:{src:r(423),alt:""}})])]),t._v(" "),a("p",[a("strong",[t._v("这里的 ACK 包和 SYN 包都是 TCP 层次的")])]),t._v(" "),a("p",[a("strong",[t._v("实际 wireshark 抓包")]),t._v(" "),a("img",{attrs:{src:r(424),alt:""}})]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("strong",[t._v("在实际互联网中，联网过程更加复杂（因为各种基础设施）")]),t._v(" "),a("ol",[a("li",[t._v("如果是台式机，则可能使用带水晶头的双绞线介入网络；如果是手机，则可能通过蜂窝网络或Wi-Fi介入网络")]),t._v(" "),a("li",[t._v("接入网络后，网络运营商会分配IP地址，可能是静态分配或动态分配(DHCP 过程)")]),t._v(" "),a("li",[t._v("服务器对外表现是一个 IP 地址，通常入口是负载均衡设备，比如四层的 LVS 或 七层的 Ngnix，后面是集群。\n"),a("ul",[a("li",[t._v("负载均衡设备通常会先访问系统的缓存服务器，比如常用的 memory 级别缓存 redis 或 disk 级别缓存 varnish")])])])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);