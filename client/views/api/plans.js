/**
 * Mocking client-server processing
 */
import axios from 'axios'

const _Plans =[]; 
axios({
        method: 'get',
        url: '/plans',
        responseType: 'json'
      }).then(function(response) {
      console.log(response);
      response.data.map(function(obj) { 
        console.log(obj);
        _Plans.push({
          "plan_id":obj.plan_id,
          "plan_name":obj.plan_name,
          "plan_excerpt":obj.plan_excerpt,
          "plan_content":obj.plan_content,
          "plan_thumbnail":obj.plan_thumbnail
        });
      });
      console.log(_Plans);
});

// const _articletpl = [
//   {"plan_id": 0, "plan_name": "Where can I get some?", "plan_excerpt": '2016-10-10', "content": "Lorem Ipsum is simply dummy text","type":"post"},
// ]
//Object.assign(_Plans, _articletpl);

console.log(_Plans);
const _html = "ciaosss"

export default {
  getPlans (cb) {
    setTimeout(() => cb(_Plans), 100)
  }
}
