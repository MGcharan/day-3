const express=require('express')

const app= express();
const PORT=4000;
const bp=require('body-parser');

app.use(bp.json())// json bodies in parsing

let items=[
    {id:1,name:'Item1'},
    {id:2,name:'Item2'},
];

app.get ("/getItem",(req,res)=>{
    res.json(items);
})

app.post('/items',(req,res)=>{
    const newItem=req.body;
    if(!newItem.id || !newItem.name){
        return res.status(500).send("Item must have an id and name")
    }
    items.push(newItem)
    res.status(201).send(`items added with ID:${newItem.id}`)
})


app.put('/items/:id',(req,res)=>{
    const itemId=parseInt(req.params.id)
    const updateItem=req.body;
    const index=items.findIndex((item)=> item.id===itemId)
    if(index===-1){
        return res.status(404).send('item not found')
    }

    if(!updateItem.name){
        return res.status(500).send(`items must be id and name`)
    }
    items[index].name=updateItem.name
    res.status(201).send(`items update with ID ${itemId}`)


})

app.delete('/items/:id',(req,res)=>{
    const itemId =parseInt(req.params.id)
    // const deleteItem=req.body

    const index=items.findIndex((item)=>item.id===itemId)
    if(index === -1){
        res.status(404).send('items not found');
    }

    items.splice(index ,1);
    res.status(201).send(`item deleted with ID: ${itemId}`)
})






app.listen(PORT,()=>{
    console.log(`server is running successfully`,PORT);
})