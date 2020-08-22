# Redux

### Props vs State
##### Props (Properties)
- Component 사이에 talk할 때 Props 이용
- 소통 방식 : 위 → 아래(부모 Component → 자식 Component)
- immutable, 바꾸기 위해서는 다시 부모에서 받아야함  
![image](https://user-images.githubusercontent.com/46713032/90952027-19139900-e49b-11ea-855e-07cefbe62bd7.png)  

##### State
- Component 안에서 Data 교환/전달
- mutable, 내부에서 변할 수 있음
- state이 변하면 re-render  
![image](https://user-images.githubusercontent.com/46713032/90952030-22046a80-e49b-11ea-8101-dc3227210286.png)  

* * * 

### Redux
- predictable state container == 상태 관리 라이브러리  
![image](https://user-images.githubusercontent.com/46713032/90952056-60018e80-e49b-11ea-8372-e96d37393813.png)  
하위 Component에서 Action이 생겨서 변화를 알려줄 때
- Redux가 없으면 하나하나 올라가야함
- Redux Store에 저장해두면 바로 Store에 직접 접근 가능
- Store : Application의 State을 감싸주는 역할, 안에 있는 여러 method들을 이용해서 state을 관리  

* * * 

### Redux의 Data Flow (Strict Unidirectional Data Flow)
![image](https://user-images.githubusercontent.com/46713032/90952151-4c0a5c80-e49c-11ea-9305-59634c16d814.png)  
- Action : 무엇이 일어났는지 설명하는 객체  
![image](https://user-images.githubusercontent.com/46713032/90952175-78be7400-e49c-11ea-8b44-7492a80945a2.png)  
- Reducer : Action으로 인해 변한 State를 설명해줌, 이전 State과 Action Object 이후의 Next State을 Return  
![image](https://user-images.githubusercontent.com/46713032/90952185-925fbb80-e49c-11ea-8f47-3247a1075c21.png)
