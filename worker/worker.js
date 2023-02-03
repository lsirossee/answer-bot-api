export default {
  async fetch(request, env) {
    try {
      const { pathname } = new URL(request.url);
      const token = 'abc123def456xyz789' //your Zendesk Basic Authorisation username/token:api_token
      const domain = 'internalnote' //your Zendesk domain
      
      if (pathname.startsWith("/recommendations")) {
        //Get the incoming enquiry
        var enquiry = JSON.stringify(await request.json());

        //Set API URL
        const url = 'https://'+domain+'.zendesk.com/api/v2/answer_bot/answers/articles';

        const init = {
          body: enquiry,
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Authorization': 'Basic ' + token,
          },
        };
        const response = await fetch(url, init);
        const results = await response.json();
        return new Response(JSON.stringify(results), {headers: {'content-type': 'application/json;charset=UTF-8'}});
      }
      if (pathname.startsWith("/resolve")) {
        //Get the incoming payload
        var payload = JSON.stringify(await request.json());

        //Set API URL
        const url = 'https://'+domain+'.zendesk.com/api/v2/answer_bot/resolution';

        const init = {
          body: payload,
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8'
          },
        };
        const response = await fetch(url, init);
        const results = await response.status;
        return new Response(JSON.stringify(results), {headers: {'content-type': 'application/json;charset=UTF-8'}});
      }
      if (pathname.startsWith("/reject")) {
        //Get the incoming payload
        var payload = JSON.stringify(await request.json());

        //Set API URL
        const url = 'https://'+domain+'.zendesk.com/api/v2/answer_bot/rejection';

        const init = {
          body: payload,
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8'
          },
        };
        const response = await fetch(url, init);
        const results = await response.status;
        return new Response(JSON.stringify(results), {headers: {'content-type': 'application/json;charset=UTF-8'}});
      }
      return fetch("https://welcome.developers.workers.dev");
    } catch(e) {
      console.log(e)
      return new Response(err.stack, { status: 500 })
    }
  }
}
