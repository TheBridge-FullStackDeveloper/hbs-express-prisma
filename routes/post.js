const express = require('express');
const prisma = require("../prisma/prisma");
const router = express.Router();

router.get("/", async (req,res)=>{
    try {
        const posts = await prisma.post.findMany({
            orderBy:{
                updatedAt: 'desc'
            }
        })
        res.render("Get-Posts", {
            titlePage:'Get Posts',
            posts
        })
        
    } catch (error) {
        console.error(error)
    }
})

router.get("/creates", (req,res)=>{
    res.render("Post-Post", {
        titlePage: "Post Post"
    })
})

router.post("/creates", async (req, res)=>{

    const { title, content, published } = req.body
try {
    await prisma.post.create({
        data: {
            title,
            content,
            published
        }
    })
    
} catch (error) {
    console.error(error)
}
    res.redirect("/posts")
})

router.get("/:id", async (req, res)=>{
    const { id } = req.params
    try {
       const filterId = await prisma.post.findUnique({
        where:{
            id: id
        }
       })
       res.render("Get-Post-Id",{
        titlePage: "Get Post Id",
        post: filterId
       })
    } catch (error) {
        console.error(error)
    }
})

router.put("/:id", async(req, res)=>{
    const { id } = req.params
    const { title, content, published } = req.body

    try {
        await prisma.post.update({
            where:{
                id
            },
            data:{
                title,
                content,
                published
            }
        })
        
    } catch (error) {
        console.error(error)
    }
    res.redirect("/posts")
})

router.delete("/:id", async (req,res)=>{
    const { id } = req.params
    try {
        await prisma.post.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.error(error)
    }
    res.redirect("/posts")
})




module.exports = router;