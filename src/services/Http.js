import axios from "axios";

export default function Http(options) {
  return new Promise((resolve, reject) => {
    let config = {
      baseUrl: process.env.VUE_APP_API_URL,
      accept: process.env.VUE_APP_API_ACCEPT,
      debug: process.env.VUE_APP_DEBUG
    };

    let getAccessToken = function() {
      let type = window.sessionStorage.getItem("token_type");
      let token = window.sessionStorage.getItem("access_token");
      return type + " " + token;
    };
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Accept: config.accept,
        Authorization: getAccessToken()
      },
      transformResponse: [
        function(data) {
          return data;
        }
      ]
    });

    //request 拦截器

    instance.interceptors.request.use(
      config => {
        if (config.method === "post") {
          // config.data = qs.stringify(config.data);
        }
        return config; //添加这一行
      },
      error => {
        return Promise.reject(error);
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        // 根据返回的code值来做不同的处理（和后端约定）
        switch (data.code) {
          case "200":
            break;
          case "201":
            break;
          case "202":
            break;
          case "204":
            break;
          default:
            break;
        }
        return data;
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = "请求错误";
              break;
            case 401:
              error.message = "未授权，请登录";
              break;
            case 403:
              error.message = "拒绝访问";
              break;
            case 404:
              error.message = `请求地址出错: ${error.response.config.url}`;
              break;
            case 408:
              error.message = "请求超时";
              break;
            case 422:
              error.message = "请求参数错误";
              break;
            case 500:
              error.message = "服务器内部错误";
              break;
            case 501:
              error.message = "服务未实现";
              break;
            case 502:
              error.message = "网关错误";
              break;
            case 503:
              error.message = "服务不可用";
              break;
            case 504:
              error.message = "请求方法不允许";
              break;
            case 505:
              error.message = "HTTP版本不受支持";
              break;
            default:
          }
        }
        // 此处我使用的是 element UI 的提示组件
        // Message.error(`ERROR: ${err}`);
        return Promise.reject(error); // 返回接口返回的错误信息
      }
    );

    //请求处理
    instance(options)
      .then(response => {
        resolve(response);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
}
