export function getQueryParams(): { [key: string]: string } {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    debugger
    if (!queryString) {
      return {};
    }
  
    const queryPairs = queryString.split('&');
    const params: { [key: string]: string } = {};
  
    queryPairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value);
    });
    return params;
  }
  