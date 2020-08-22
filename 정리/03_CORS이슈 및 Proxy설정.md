![image](https://user-images.githubusercontent.com/46713032/90951848-8b837980-e499-11ea-85a9-0a3517346a54.png)

Client 부분이 없어서 POSTMAN을 이용해서 request를 보냈었음  
이제는 있어서 React JS에서 Request를 보내면 되는데 그때 [AXIOS](https://github.com/axios/axios)를 사용함 (AXIOS : JQuery를 사용할 때 AJAX라고 보면 됨)  
  

하지만 Axios를 사용해서 Request를 보내면 Error가 생김  
→ 두개의 다른 포트(Server : 5000, Client : 3000)를 가지고 있을 때 아무 설정 없이는 Request 불가능  
→ Cross-Origin Resource Sharing(CORS) 정책 때문에  
→ [여러가지 해결 방법](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9) 중 Proxy  
  

# CORS이슈 및 Proxy설정

![image](https://user-images.githubusercontent.com/46713032/90951861-afdf5600-e499-11ea-8223-b276910f4775.png)
- User의 IP를 Proxy Server에서 임의로 변경 가능 → 받는 사람은 User의 실제 IP를 모름
- User가 전송하는 Data도 임의로 변경 가능
- 방화벽 기능
- 웹 필터 기능
- Cash Data, 공유 Data 제공 기능
