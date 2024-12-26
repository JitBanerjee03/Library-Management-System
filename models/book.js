const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:false
    },
    
    category:{
        type:Number,
        enum:[0,1,2,3,4,5],
        required:true
    },

    isFiction:{ //0
        type:String,

        enum:["Mystery & Thriller",
              "Science Fiction",
              "Fantasy",
              "Historical Fiction",
              "Romance",
              "Horror",
              "Adventure",
              "Contemporary Fiction",
              "Satire",
              "Literary Fiction"],

        required:false
    },

    isNonFiction:{  //1
        type:String,

        enum:["Biography & Autobiography",
                "Self-Help",
                "History",
                "Science & Technology",
                "Philosophy",
                "Politics & Current Affairs",
                "Psychology",
                "Business & Economics",
                "Travel & Exploration",
                "True Crime"],

        required:false
    },

    isAcademic_Professional:{  //2
        type:String,

        enum:["Textbooks",
                "Engineering",
                "Medicine & Health Sciences",
                "Law",
                "Computer Science & Programming",
                "Mathematics",
                "Social Sciences",
                "Language & Linguistics",
                "Education & Teaching",
                "Research Journals"],

        required:false
    },

    isHobbies_Interests:{  //3
        type: String,

        enum:["Cookbooks & Food",
                "Art & Photography",
                "Gardening",
                "Crafts & DIY",
                "Music & Performing Arts",
                "Sports & Fitness",
                "Interior Design",
                "Travel Guides",
                "Pets & Animals",
                "Fashion & Beauty"],

        required:false
    },

    isChildren_Young_Adult:{  //4
        type:String,

        enum:["Picture Books",
                "Early Readers",
                "Young Adult Fantasy",
                "Coming of Age",
                "Graphic Novels for Kids",
                "Adventure for Young Readers",
                "Bedtime Stories",
                "Educational Books",
                "Classic Tales for Kids",
                "Young Adult Romance"],

        required:false
    },

    isReligion_Spirituality:{  //5
        type:String,

        enum:["Theology",
                "Meditation & Mindfulness",
                "Mythology",
                "Religious Texts",
                "New Age & Spirituality"],

        required:false
    },
    
    price:{
        type:Number,
        required:true
    },

    edition:{
        type:Number,
        required:false
    },

    authorName:{
        type:String,
        required:true
    },
    
    isAvailable:{
        type:Boolean,
        required:true
    }
})

const bookModel=mongoose.model('book',bookSchema);
module.exports=bookModel