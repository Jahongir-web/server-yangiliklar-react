const newsModel = require('../model/query')
const { rows } = require('../../database/pg')
const {sign, verify} = require('../../function/jwt')

const all = async (req, res)=> {
  
    const { access_token, page } = req.headers
  
    const news = await rows(newsModel.NEWS, page-0)
  
    try {
      if (access_token !== 'null') {
        verify(access_token)
        const {user_id, name} = verify(access_token)
        res.send({news, name, user_id})
      } else if(access_token === 'null') {
        res.send({news})
      }
    } catch (error) {
      res.send(error)
    }
}

const views = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.VIEWS, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const addLike = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.ADD_LIKE, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const changeLike = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.ADD_LIKE, newsid-0)
    await rows(newsModel.DEL_DISLIKE, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const delLike = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.DEL_LIKE, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const addDislike = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.ADD_DISLIKE, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const changeDislike = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.ADD_DISLIKE, newsid-0)
    await rows(newsModel.DEL_LIKE, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const delDislike = async (req, res) => {

    const { newsid } = req.headers
    await rows(newsModel.DEL_DISLIKE, newsid-0)
    const news = await rows(newsModel.NEWS_ITEM, newsid-0)
  
    res.send(news)
}

const search = async (req, res) => {
    const { title } = req.headers
    const resoult = await rows(newsModel.SEARCH_NEWS, `%${title}%`)
    res.send(resoult)
}

const category = async (req, res) => {
    const { category } = req.headers
    const resoult = await rows(newsModel.GET_BY_CATEGORY, category)
    res.send(resoult)
}


module.exports = {
    all,
    views,
    addLike,
    changeLike,
    delLike,
    addDislike,
    changeDislike,
    delDislike,
    search,
    category,

}