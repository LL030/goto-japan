/**
 * Mocking client-server processing
 */

import axios from 'axios'

const _article =[]; 
axios({
        method: 'get',
        url: '/post',
        responseType: 'json'
      }).then(function(response) {
      console.log(response);
      response.data.map(function(obj) { 
        console.log(obj);
        if(obj.post_status == 1){
          _article.push({
            "id":obj.post_id,
            "title":obj.post_title,
            "date":obj.post_date,
            "content":obj.post_content,
            "type":"post"
          });
        }
      });
      console.log(_article);
});

const _products = [
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
]

const _articletpl = [
  {"id": 11, "title": "Where can I get some?", "date": '2016-10-10', "content": "Lorem Ipsum is simply dummy text","type":"post"},
  {"id": 12, "title": "Where can I get some?", "date": '2016-10-09', "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web p","type":"post"},
  {"id": 13, "title": "Where can I get some?", "date": '2016-10-08', "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web p","type":"post"},
  {"id": 14, "title": "Where can I get some?", "date": '2016-10-07', "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web p","type":"post"},
  {"id": 15, "title": "Where can I get some?", "date": '2016-10-06', "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web p","type":"post"},
]
Object.assign(_article, _articletpl);

console.log(_article);
const _html = "ciaosss"

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  getPosts (cb) {
    setTimeout(() => cb(_article), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
