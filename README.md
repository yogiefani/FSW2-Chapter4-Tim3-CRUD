<p align="center"><a href="https://nodejs.org/en" target="_blank"><img src="https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Node.js/Node.js.png" width="400" alt="NodeJS Logo"></a></p>

<p align="center">
<a href="https://github.com/yogiefani/FSW2-Chapter3-Tim3-Expressjs"><img src="https://img.shields.io/badge/all_contributors-8-brightgreen.svg?style=flat-square" alt="Total Downloads"></a>
<a href="https://github.com/yogiefani/FSW2-Chapter3-Tim3-Expressjs"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="Latest Stable Version"></a>
<a href="https://github.com/yogiefani/FSW2-Chapter3-Tim3-Expressjs"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg" alt="License"></a>
</p>

</p>

</br>

## ABOUT THIS WorkSync Admin

WorkSync adalah aplikasi yang dibangun untuk membantu mempermudah pengguna dalam mengelola pekerjaan tim. WorkSync dibangun menggunakan Express.JS, PostgreSQL, dan EJS.

## DATABASE ERD

<p align="center"><a href="https://nodejs.org/en" target="_blank"><img src="./public/images/fsw2-chapter4-team3.png" width="800" alt="ERD.png"></a></p>

## API
<h6>Users</h6>

| Method | URL API | Description | By |
|----------|----------|----------|----------|
| get    | /dashboard   | display all users   | nuril   |
| get   | /dashboard/:id   | displaying specific user for detail information   | nuril   |
| get    | /dashboard/create   | form for create new user   | fauzan   |
| post   | /dashboard/create   | create new user   | fauzan   |
| get    | /dashboard/update/:id   | form for update of specific user by id   | fauzan   |
| patch    | /dashboard/:id/edit   | update data of specific user by id  | fauzan   |
| delete    | /dashboard/:id   | for delete specific user   | nuril   |

<h6>Roles</h6>

| Method | URL API | Description | By |
|----------|----------|----------|----------|
| get    | /roles   | display all roles   |abdi   |
| get   | /roles/:id   | displaying specific roles for detail information   |abdi   |
| get    | /roles/create   | form for create new rples  | zainal   |
| post   | /roles   | create new roles   | zainal   |
| get    | /roles/update/:id   | form for update of specific roles by id   | zainal   |
| patch    | /roles/:id   | update data of specific roles by id  | zainal   |
| delete    | /roles/:id   | for delete specific roles   |abdi   |

<h6>Tasks</h6>

| Method | URL API | Description | By |
|----------|----------|----------|----------|
| get    | /tasks   | display all tasks   | melinda   |
| get   | /tasks/detail/:id   | displaying specific task for detail information   | melinda   |
| get   | /tasks/search  | displaying specific task from id in search query  | melinda   |
| get    | /tasks/create   | form for create new task   | muria   |
| post   | /   | create new task   | muria   |
| get    | /tasks/update/:id   | form for update of specific task by id   | muria   |
| put   | /tasks/:id  | update data of specific task by id  | muria   |
| delete    | /tasks/delete/:id   | for delete specific task   | melinda   |

<h6>Project</h6>

| Method | URL API | Description | By |
|----------|----------|----------|----------|
| get    | /projects   | display all projects   | Rafif   |
| get   | /projects/:id   | displaying specific project for detail information   | Rafif   |
| get    | /projects/create   | form for create new project   | Yogi   |
| post   | /   | create new project   | Yogi   |
| get    | /projects/update/:id   | form for update of specific project by id   | Yogi   |
| patch   | /projects/:id  | update data of specific project by id  | Yogi   |
| delete    | /projects/:id   | for delete specific project   | Rafif   |

## CONTRIBUTOR

<p>1. Yogi Efani Yancandra</p>
<p>2. Abdi Pranawa Satura Ardana</p>
<p>3. Fauzan Saputra</p>
<p>4. Haikal Nuril Abiyit</p>
<p>5. Irfan Muria</p>
<p>6. Melinda Wijaya</p>
<p>7. Muhammad Rafif Ramadhansyah</p>
<p>8. Zainal Arifin Fadliansyah</p>