
export default class Ghost {
    constructor(
        name,
        evidence,
        wikiUrl,
        description,
        weaknesses,
        strengths
    ) {
        this.name = name
        this.evidence = evidence
        this.wikiUrl = wikiUrl
        this.description = description
        this.weaknesses = weaknesses
        this.strengths = strengths
    }
}
