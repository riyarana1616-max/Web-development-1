import * as pdfjsLib from
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.54/pdf.min.mjs";


/* PDF worker */

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.54/pdf.worker.min.mjs";


/* ELEMENTS */

const resumeFile =
    document.getElementById("resumeFile");

const fileName =
    document.getElementById("fileName");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const loading =
    document.getElementById("loading");


/* FILE SELECT */

resumeFile.addEventListener("change", function () {

    if (resumeFile.files.length > 0) {

        const file = resumeFile.files[0];

        fileName.innerText =
            "Selected: " + file.name;

    }

});


/* ANALYZE */

analyzeBtn.addEventListener("click", async function () {

    const file =
        resumeFile.files[0];

    const jobPosition =
        document
        .getElementById("jobPosition")
        .value
        .trim();

    const jobDescription =
        document
        .getElementById("jobDescription")
        .value
        .trim();


    /* VALIDATION */

    if (!file) {

        alert("Please upload your resume.");

        return;
    }


    if (jobPosition === "") {

        alert("Please enter the job position.");

        return;
    }


    if (jobDescription === "") {

        alert("Please enter the job description.");

        return;
    }


    /* FILE TYPE */

    const fileType =
        file.name
        .split(".")
        .pop()
        .toLowerCase();


    if (
        fileType !== "pdf" &&
        fileType !== "docx"
    ) {

        alert(
            "Please upload a PDF or DOCX file."
        );

        return;
    }


    try {

        /* SHOW LOADING */

        loading.style.display = "block";

        analyzeBtn.disabled = true;


        /* EXTRACT TEXT */

        let resumeText = "";


        if (fileType === "pdf") {

            resumeText =
                await extractPDFText(file);

        }

        else if (fileType === "docx") {

            resumeText =
                await extractDOCXText(file);

        }


        /* CHECK TEXT */

        if (!resumeText.trim()) {

            throw new Error(
                "Could not extract text from this resume."
            );

        }


        console.log(
            "Resume Text:",
            resumeText
        );


        /* ANALYZE */

        const result =
            analyzeResume(
                resumeText,
                jobDescription,
                jobPosition
            );


        /* SHOW RESULT */

        displayResults(result);


        /* SHOW EXTRACTED TEXT */

        document.getElementById(
            "resumeText"
        ).innerText = resumeText;


    }

    catch (error) {

        console.error(error);

        alert(
            "Could not analyze the resume.\n\n" +
            error.message
        );

    }

    finally {

        loading.style.display = "none";

        analyzeBtn.disabled = false;

    }

});


/* =========================================
   PDF TEXT EXTRACTION
========================================= */

async function extractPDFText(file) {

    const arrayBuffer =
        await file.arrayBuffer();


    const pdf =
        await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;


    let fullText = "";


    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        const page =
            await pdf.getPage(pageNumber);


        const textContent =
            await page.getTextContent();


        const pageText =
            textContent.items
            .map(item => item.str)
            .join(" ");


        fullText +=
            pageText + "\n";

    }


    return fullText;

}


/* =========================================
   DOCX TEXT EXTRACTION
========================================= */

async function extractDOCXText(file) {

    const arrayBuffer =
        await file.arrayBuffer();


    const result =
        await mammoth.extractRawText({
            arrayBuffer: arrayBuffer
        });


    return result.value;

}


/* =========================================
   RESUME ANALYZER
========================================= */

function analyzeResume(
    resumeText,
    jobDescription,
    jobPosition
) {

    const resume =
        cleanText(resumeText);

    const job =
        cleanText(jobDescription);


    /* SKILLS DATABASE */

    const skills = [

        "html",
        "css",
        "javascript",
        "typescript",
        "react",
        "angular",
        "vue",
        "next.js",
        "node.js",
        "node",
        "express",
        "python",
        "java",
        "c",
        "c++",
        "sql",
        "mysql",
        "mongodb",
        "postgresql",
        "git",
        "github",
        "docker",
        "aws",
        "azure",
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "data analysis",
        "excel",
        "power bi",
        "tableau",
        "figma",
        "rest api",
        "api",
        "firebase",
        "php",
        "laravel",
        "django",
        "flask",
        "spring boot",
        "bootstrap",
        "tailwind",
        "jquery",
        "wordpress",
        "linux",
        "communication",
        "leadership",
        "problem solving",
        "teamwork"

    ];


    /* FIND REQUIRED SKILLS */

    const requiredSkills =
        skills.filter(skill =>
            containsKeyword(job, skill)
        );


    /* MATCHING */

    const matchingSkills =
        requiredSkills.filter(skill =>
            containsKeyword(resume, skill)
        );


    /* MISSING */

    const missingSkills =
        requiredSkills.filter(skill =>
            !containsKeyword(resume, skill)
        );


    /* KEYWORD ANALYSIS */

    const jobKeywords =
        extractImportantKeywords(job);


    const matchingKeywords =
        jobKeywords.filter(keyword =>
            resume.includes(keyword)
        );


    let keywordScore = 0;


    if (jobKeywords.length > 0) {

        keywordScore =
            Math.round(
                (
                    matchingKeywords.length /
                    jobKeywords.length
                ) * 100
            );

    }


    /*
        ATS SCORE

        Skills = 60%
        Keywords = 25%
        Resume quality = 15%
    */


    let skillScore = 0;


    if (requiredSkills.length > 0) {

        skillScore =
            (
                matchingSkills.length /
                requiredSkills.length
            ) * 100;

    }

    else {

        skillScore = keywordScore;

    }


    const qualityScore =
        calculateResumeQuality(resume);


    let atsScore =
        Math.round(
            (skillScore * 0.60) +
            (keywordScore * 0.25) +
            (qualityScore * 0.15)
        );


    atsScore =
        Math.max(
            0,
            Math.min(100, atsScore)
        );


    /* MATCH RESULT */

    let matchResult;


    if (atsScore >= 80) {

        matchResult =
            "🟢 Excellent Match — your resume is highly suitable for this position.";

    }

    else if (atsScore >= 65) {

        matchResult =
            "🟡 Good Match — your resume is suitable, but some improvements are recommended.";

    }

    else if (atsScore >= 50) {

        matchResult =
            "🟠 Moderate Match — customize your resume more for this position.";

    }

    else {

        matchResult =
            "🔴 Low Match — your resume needs significant improvement for this position.";

    }


    /* IMPROVEMENTS */

    const improvements =
        generateImprovements(
            resume,
            job,
            missingSkills,
            keywordScore,
            atsScore
        );


    return {

        atsScore,

        matchingSkills,

        missingSkills,

        totalKeywords:
            jobKeywords.length,

        matchingKeywords:
            matchingKeywords.length,

        keywordScore,

        matchResult,

        improvements

    };

}


/* =========================================
   CLEAN TEXT
========================================= */

function cleanText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s.+#-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* =========================================
   CHECK KEYWORD
========================================= */

function containsKeyword(
    text,
    keyword
) {

    const escaped =
        keyword.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );


    const regex =
        new RegExp(
            "(^|\\s)" +
            escaped +
            "(?=\\s|$)",
            "i"
        );


    return regex.test(text);

}


/* =========================================
   IMPORTANT KEYWORDS
========================================= */

function extractImportantKeywords(text) {

    const words =
        text
        .toLowerCase()
        .match(
            /\b[a-z][a-z0-9+#.-]{2,}\b/g
        ) || [];


    const stopWords = new Set([

        "the",
        "and",
        "for",
        "with",
        "you",
        "your",
        "our",
        "are",
        "will",
        "this",
        "that",
        "from",
        "have",
        "has",
        "job",
        "work",
        "working",
        "role",
        "using",
        "into",
        "about",
        "they",
        "their",
        "years",
        "year",
        "experience",
        "candidate",
        "required",
        "requirements",
        "responsibilities",
        "skills",
        "team"

    ]);


    const frequency = {};


    words.forEach(word => {

        if (!stopWords.has(word)) {

            frequency[word] =
                (frequency[word] || 0) + 1;

        }

    });


    return Object.keys(frequency)
        .filter(word =>
            frequency[word] >= 1
        )
        .sort(
            (a, b) =>
                frequency[b] -
                frequency[a]
        )
        .slice(0, 30);

}


/* =========================================
   RESUME QUALITY
========================================= */

function calculateResumeQuality(
    resume
) {

    let score = 0;


    /* Length */

    if (resume.length > 500) {

        score += 20;

    }


    if (resume.length > 1500) {

        score += 20;

    }


    /* Sections */

    const sections = [

        "education",
        "experience",
        "skills",
        "projects",
        "summary",
        "objective",
        "certification"

    ];


    sections.forEach(section => {

        if (resume.includes(section)) {

            score += 8;

        }

    });


    /* Contact information */

    if (
        resume.includes("@")
    ) {

        score += 5;

    }


    if (
        /\b\d{10}\b/.test(resume)
    ) {

        score += 5;

    }


    return Math.min(
        100,
        score
    );

}


/* =========================================
   IMPROVEMENTS
========================================= */

function generateImprovements(
    resume,
    job,
    missingSkills,
    keywordScore,
    atsScore
) {

    const suggestions = [];


    if (missingSkills.length > 0) {

        suggestions.push(
            "Add relevant missing skills if you genuinely have those skills: " +
            missingSkills.join(", ") + "."
        );

    }


    if (keywordScore < 60) {

        suggestions.push(
            "Use more relevant keywords from the job description naturally in your resume."
        );

    }


    if (!resume.includes("projects")) {

        suggestions.push(
            "Add a Projects section with relevant projects."
        );

    }


    if (!resume.includes("experience")) {

        suggestions.push(
            "Add your work experience, internships, or practical experience."
        );

    }


    if (!resume.includes("education")) {

        suggestions.push(
            "Add an Education section."
        );

    }


    if (!resume.includes("github")) {

        suggestions.push(
            "Consider adding your GitHub profile if you have relevant coding projects."
        );

    }


    if (!resume.includes("linkedin")) {

        suggestions.push(
            "Consider adding your LinkedIn profile."
        );

    }


    if (resume.length < 1000) {

        suggestions.push(
            "Your resume text appears short. Add relevant achievements, projects and experience."
        );

    }


    if (atsScore < 60) {

        suggestions.push(
            "Create a job-specific version of your resume instead of using exactly the same resume for every position."
        );

    }


    if (suggestions.length === 0) {

        suggestions.push(
            "Your resume has a good match with the job description. Keep improving it with measurable achievements."
        );

    }


    return suggestions;

}


/* =========================================
   DISPLAY RESULTS
========================================= */

function displayResults(result) {

    /* SHOW RESULTS */

    document.getElementById(
        "resultSection"
    ).style.display = "block";


    /* SCORE */

    document.getElementById(
        "atsScore"
    ).innerText =
        result.atsScore + "%";


    /* MATCH */

    document.getElementById(
        "matchResult"
    ).innerText =
        result.matchResult;


    /* MATCHING SKILLS */

    const matchingContainer =
        document.getElementById(
            "matchingSkills"
        );


    matchingContainer.innerHTML = "";


    if (
        result.matchingSkills.length === 0
    ) {

        matchingContainer.innerHTML =
            "<span>No matching skills found.</span>";

    }

    else {

        result.matchingSkills.forEach(
            skill => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.className =
                    "skill";

                span.innerText =
                    skill;

                matchingContainer.appendChild(
                    span
                );

            }
        );

    }


    /* MISSING SKILLS */

    const missingContainer =
        document.getElementById(
            "missingSkills"
        );


    missingContainer.innerHTML = "";


    if (
        result.missingSkills.length === 0
    ) {

        missingContainer.innerHTML =
            "<span class='skill'>No major missing skills 🎉</span>";

    }

    else {

        result.missingSkills.forEach(
            skill => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.className =
                    "skill missing-skill";

                span.innerText =
                    skill;

                missingContainer.appendChild(
                    span
                );

            }
        );

    }


    /* KEYWORDS */

    document.getElementById(
        "totalKeywords"
    ).innerText =
        result.totalKeywords;


    document.getElementById(
        "matchedKeywords"
    ).innerText =
        result.matchingKeywords;


    document.getElementById(
        "keywordPercentage"
    ).innerText =
        result.keywordScore + "%";


    /* IMPROVEMENTS */

    const improvements =
        document.getElementById(
            "improvements"
        );


    improvements.innerHTML = "";


    result.improvements.forEach(
        suggestion => {

            const li =
                document.createElement(
                    "li"
                );

            li.innerText =
                suggestion;

            improvements.appendChild(
                li
            );

        }
    );


    /* SCROLL */

    document.getElementById(
        "resultSection"
    ).scrollIntoView({
        behavior: "smooth"
    });

}