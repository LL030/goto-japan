/**
 * Mocking client-server processing
 */
import axios from 'axios'

const _Plans =[]; 
axios({
        method: 'get',
        url: '/api/plans',
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

const _plansTpl = [
  {"plan_id": 0, "plan_name": "plan_name", "plan_excerpt": 'plan_excerpt', "plan_content": "plan_content","plan_thumbnail":"plan_thumbnail"},
]
Object.assign(_Plans, _plansTpl);

console.log(_Plans);
const _html = "ciaosss"

export default {
  getPlans (cb) {
    setTimeout(() => cb(_Plans), 100)
  }
}
