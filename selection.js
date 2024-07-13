document.getElementById('paper-selection-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const year = document.getElementById('year').value;
    const subject = document.getElementById('subject').value;
    const medium = document.getElementById('medium').value;

    // Store selected year and type in local storage
    localStorage.setItem('selectedYear', year);
    localStorage.setItem('selectedsubject', subject);
    localStorage.setItem('selectedmedium', medium);

    // Redirect to quiz page
    window.location.href = 'quiz.html';
});