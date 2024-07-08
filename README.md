
```
blog
├─ .DS_Store
├─ blog_backend
│  ├─ .DS_Store
│  ├─ .env
│  ├─ .eslintrc.json
│  ├─ jsconfing.json
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     ├─ api
│     │  ├─ auth
│     │  │  ├─ auth.ctrl.js
│     │  │  └─ index.js
│     │  ├─ index.js
│     │  └─ posts
│     │     ├─ SanitizeOption.js
│     │     ├─ index.js
│     │     └─ posts.ctrl.js
│     ├─ createFakeData.js
│     ├─ index.js
│     ├─ lib
│     │  ├─ checkLoggedIn.js
│     │  └─ jwtMiddleware.js
│     └─ models
│        ├─ post.js
│        └─ user.js
└─ blog_frontend
   ├─ .DS_Store
   ├─ .prettierrc
   ├─ README.md
   ├─ jsconfig.json
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  ├─ index.html
   │  ├─ logo192.png
   │  ├─ logo512.png
   │  ├─ manifest.json
   │  └─ robots.txt
   └─ src
      ├─ App.css
      ├─ App.js
      ├─ components
      │  ├─ auth
      │  │  ├─ AuthForm.js
      │  │  └─ AuthTemplate.js
      │  ├─ base
      │  │  └─ Header.js
      │  ├─ common
      │  │  ├─ AskModal.js
      │  │  ├─ Button.js
      │  │  ├─ Header.js
      │  │  ├─ Responsive.js
      │  │  ├─ SubInfo.js
      │  │  └─ Tags.js
      │  ├─ post
      │  │  ├─ AskRemoveModal.js
      │  │  ├─ PostActionButtons.js
      │  │  └─ PostViewer.js
      │  ├─ posts
      │  │  ├─ Pagination.js
      │  │  └─ PostList.js
      │  └─ write
      │     ├─ Editor.js
      │     ├─ TagBox.js
      │     └─ WriteActionButton.js
      ├─ containers
      │  ├─ auth
      │  │  ├─ LoginForm.js
      │  │  └─ RegisterForm.js
      │  ├─ common
      │  │  └─ HeaderContainer.js
      │  ├─ post
      │  │  └─ PostViewerContainer.js
      │  ├─ posts
      │  │  ├─ PaginationContainer.js
      │  │  └─ PostListContainer.js
      │  └─ write
      │     ├─ EditorContainer.js
      │     ├─ TagBoxContainer.js
      │     └─ WriteActionButtonsContainer.js
      ├─ index.css
      ├─ index.js
      ├─ lib
      │  ├─ api
      │  │  ├─ auth.js
      │  │  ├─ client.js
      │  │  └─ posts.js
      │  ├─ createRequestSaga.js
      │  └─ styles
      │     └─ palette.js
      ├─ modules
      │  ├─ auth.js
      │  ├─ index.js
      │  ├─ loading.js
      │  ├─ post.js
      │  ├─ posts.js
      │  ├─ user.js
      │  └─ write.js
      └─ pages
         ├─ LoginPage.js
         ├─ PostListPage.js
         ├─ PostPage.js
         ├─ RegisterPage.js
         ├─ UserPage.js
         └─ WritePage.js

```