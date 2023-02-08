/*
 * @Author: SHISHUAI 11608972+shishuai_ss@user.noreply.gitee.com
 * @Date: 2022-12-13 08:29:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-14 15:00:58
 * @FilePath: \xing-ba-ke\src\utils\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "./request";

export const API = {
  // 1.登录接口
  Login: (data) => request({ url: "/login", method: "POST", data }),
  // 2.注册接口
  Register: (data) => request({ url: "/register", method: "POST", data }),
  // 3.用户列表: GET /pulluserlist?query=
  PullUserList: (data) =>
    request({ url: "/pulluserlist", method: "GET", params: data }),
  // 4.获取桌号:GET /gettable
  Gettable: (data) => request({ url: "/gettable", method: "GET", data }),
  // 5.获取订单管理数据:GET /obtainorder?query=
  ObtainOrder: (data) =>
    request({ url: "/obtainorder", method: "GET", params: data }),
  // 8.查看详细菜单: GET /vieworder?query=
  ViewOrder: (data) =>
    request({ url: "/vieworder?query=", method: "GET", params: data }),
  // 9.获取菜品类目: GET /obtaincate
  Obtaincate: (data) => request({ url: "/obtaincate", method: "GET", data }),
  //   10.获取菜品单位:GET /obtainunit
  Obtainunit: () => request({ url: "/obtainunit", method: "GET" }),
  //   12.上架菜品: POST /putdishes 【权限接口]
  Putdishes: (data) => request({ url: "/putdishes", method: "POST", data }),
  // 13.编辑菜品: POST /editdishes 【权限接口】
  Editdishes: (data) => request({ url: "/editdishes", method: "POST", data }),
  // 14.获取菜品数据：GET /obtaindishes?query=[权限接口]
  Obtaindishes: (data) =>
    request({ url: "/obtaindishes", method: "GET", params: data }),
  // 15.下架菜品: GET /fromsale?query=[权限接口]
  Fromsale: (data) =>
    request({ url: "/fromsale?query=", method: "GET", params: data }),
  // 16.添加员工: POST /addem[权限接口]
  Addem: (data) => request({ url: "/addem", method: "POST", data }),
  // 17.获取员工详情: GET /getemployees?query=[权限接口]
  Getemployees: (data) =>
    request({ url: "/getemployees", method: "GET", params: data }),
  // 18.修改是否离职状态: GET /modifyresi?query=[权限接口]
  Modifyresi: (data) =>
    request({ url: "/modifyresi", method: "GET", params: data }),
  // 19.删除员工：POST /deleteemp【权限接口]
  Deleteemp: (data) => request({ url: "/deleteemp", method: "POST", data }),
  // 20.数据分析: GET /analysis
  Analysis: (data) => request({ url: "/analysis", method: "GET", data }),
  // 21.数据分析【折线图菜品分类更新】: GET /switchcate?query=
  SwitchCate: (data) =>
    request({ url: "/switchcate?query=", method: "GET", params: data }),
  // 22.图片上传接口：  GET /uploadres
  Uploadres: (data) =>
    request({ url: "/uploadres", method: "GET", params: data }),
};
