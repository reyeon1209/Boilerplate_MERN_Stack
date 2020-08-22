# ReactJS란?

<br>

1. 페이스북에서 2013년도에 만든 Library
2. Module과 비슷하게 Components로 이루어져 있어서 reuseable이 뛰어남
3. Virtual DOM

### Real DOM vs Virtual DOM
10개의 리스트가 있을 때, 그 중 리스트 한개가 update되면
- Real DOM : 전체 리스트를 reload 해야함
- Virtual DOM : 바뀐 리스트만 DOM에서 바꿔줌

### Virtual DOM
- Real DOM과 같은 properties를 갖고 있으면 Real DOM을 copy한 것이라 보면 됨
- Diffing(Virtual DOM이 이전 Virtual DOM이 찍어둔 Snapshot과 비교해서 바뀐 부분을 찾음)과정을 한 후 바뀐 부분만 Real DOM에서 바꿔줌
