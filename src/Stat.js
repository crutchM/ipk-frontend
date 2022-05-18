

export default class Stat{
    constructor(userId,chairId,employment,expert, lessonDate) {
        this.userId = userId
        this.postId = 0
        this.chairId = chairId
        this.employment = employment
        this.expert = expert
        this.lessonDate = lessonDate
        this.anketDate = new Date()
    }
}
