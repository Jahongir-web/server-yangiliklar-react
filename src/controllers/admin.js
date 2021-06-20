const { v4 } = require('uuid')
const newsModel = require('../model/query')
const { rows } = require('../../database/pg')
const path = require('path')

const changeTitle = async (req, res) => {
    const { newsid, title } = req.headers
    const news = await rows(newsModel.CHANGE_TITLE, newsid-0, title)  
    res.send(news)
}

const changeContent = async (req, res) => {
    const { newsid, content } = req.headers
    const news = await rows(newsModel.CHANGE_CONTENT, newsid-0, content)
    res.send(news)
}

const uploadsDir = path.join(__dirname, '../../static/images')


const changeImg = async (req, res) => {
    const { newsid} = req.headers
    const {photo} = req.files
  
    const name = v4() + "." + photo.mimetype.split("/")[1]
    photo.mv(path.join(uploadsDir, name), (error) => {
        if(error) {console.error(error)}
    })
  
    const news = await rows(newsModel.CHANGE_IMAGE, newsid-0, name)  
    res.send(news)
}

const deleteNews = async (req, res) => {
    const { newsid } = req.headers
    const deleteNews = await rows(newsModel.DELETE_NEWS, newsid-0)
  
    res.send(deleteNews)
}

const addNews = async (req, res) => {

    const { title, content, category } = req.body
    const photo = req.files.photo
    const imgName = v4() + "." + photo.mimetype.split("/")[1]
    photo.mv(path.join(uploadsDir, imgName), (error) => {
        if(error) {console.error(error)}
    })
  
    await rows(newsModel.CREATE_NEWS, title, content, imgName, category)
    res.status(201).end()
}


module.exports = {
    changeTitle,
    changeContent,
    changeImg,
    deleteNews,
    addNews,
}