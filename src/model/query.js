
const SIGNUP = `
  insert into users (username, first_name, last_name, email, password) values ($1, $2, $3, $4, crypt($5, gen_salt('bf'))) returning user_id, username as name
`

const CHECK_EMAIL = `
  select * from users where email = $1
`

const CHECK_USERNAME = `
  select * from users where username = $1
`
const LOGIN = `
  select
    user_id, username as name
  from
    users
  where
    username = $1 and password = crypt($2, password)

`

const CREATE_NEWS = `
  insert into news values ($1, $2, $3, $4) returning *
`

const NEWS = `
  select title, content, img, views, likes, dislike, news_id, to_char(created_at, 'YYYY-MM-DD') as date from news order by news_id limit 6 offset ($1-1)*6 
`

const VIEWS = `
  update news set views = views+1 where news_id = $1
`

const NEWS_ITEM = `
  select title, content, img, views, likes, dislike, news_id, to_char(created_at, 'YYYY-MM-DD') as date from news where news_id = $1
`

const DELETE_NEWS = `
  delete from news where news_id = $1 returning *
`


const SEARCH_NEWS = `
  select * from news where title ilike $1
`

const GET_BY_CATEGORY = `
  select * from news where category = $1
`

const CHANGE_TITLE = `
  update news set title = $2 where news_id = $1 returning *
`

const CHANGE_CONTENT = `
  update news set content = $2 where news_id = $1 returning *
`

const CHANGE_IMAGE = `
  update news set img = $2 where news_id = $1 returning *
`

const ADD_LIKE = `
  update news set likes = likes+1 where news_id = $1
`

const DEL_LIKE = `
  update news set likes = likes-1 where news_id = $1
`

const ADD_DISLIKE = `
  update news set dislike = dislike+1 where news_id = $1
`

const DEL_DISLIKE = `
  update news set dislike = dislike-1 where news_id = $1
`


module.exports.SIGNUP = SIGNUP
module.exports.CHECK_EMAIL = CHECK_EMAIL
module.exports.CHECK_USERNAME = CHECK_USERNAME
module.exports.LOGIN = LOGIN
module.exports.CREATE_NEWS = CREATE_NEWS
module.exports.NEWS = NEWS
module.exports.NEWS_ITEM = NEWS_ITEM
module.exports.DELETE_NEWS = DELETE_NEWS
module.exports.VIEWS = VIEWS
module.exports.SEARCH_NEWS = SEARCH_NEWS
module.exports.CHANGE_TITLE = CHANGE_TITLE
module.exports.CHANGE_IMAGE = CHANGE_IMAGE
module.exports.CHANGE_CONTENT = CHANGE_CONTENT
module.exports.ADD_LIKE = ADD_LIKE
module.exports.ADD_DISLIKE = ADD_DISLIKE
module.exports.DEL_DISLIKE = DEL_DISLIKE
module.exports.DEL_LIKE = DEL_LIKE
module.exports.GET_BY_CATEGORY = GET_BY_CATEGORY
