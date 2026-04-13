let boothData = [];

// ডিফল্ট ডেটা (ছবির তথ্য অনুযায়ী)
const DEFAULT_DATA = [
    { "Shakti Kendra": "Saktikandra - 1", "Booth No": "101", "Booth Name": "Upper Jiti Primary School", "Booth Pramukh": "Manoj Xalco", "Booth Phone": "9083406967", "BLA SIR": "Pancham Kurmi", "BLA Phone": "7063725541" },
    { "Shakti Kendra": "Saktikandra - 1", "Booth No": "102", "Booth Name": "Jal Mathi Line S.S.K.", "Booth Pramukh": "Gopal Mangar", "Booth Phone": "6296671382", "BLA SIR": "Fulmini Munda", "BLA Phone": "7477520877" },
    { "Shakti Kendra": "Saktikandra - 1", "Booth No": "103", "Booth Name": "Jiti TG Primary School", "Booth Pramukh": "Rayansh Panna", "Booth Phone": "7318662690", "BLA SIR": "Santosh Kr Hathi", "BLA Phone": "9733443229" },
    { "Shakti Kendra": "Saktikandra - 1", "Booth No": "104", "Booth Name": "Jiti T.G. Junior High School", "Booth Pramukh": "Niku Mundra", "Booth Phone": "7047104733", "BLA SIR": "Bond Singh", "BLA Phone": "7047104733" },
    { "Shakti Kendra": "Saktikandra - 2", "Booth No": "105", "Booth Name": "Hope T.G. I.C.D.S. (Centre No. 157)", "Booth Pramukh": "Ganesh Munda", "Booth Phone": "7602300739", "BLA SIR": "Indra Bahadur Mangan", "BLA Phone": "8116785824" },
    { "Shakti Kendra": "Saktikandra - 2", "Booth No": "106", "Booth Name": "Thaljhor I.C.D.S. Centre", "Booth Pramukh": "Phuntsok Lama", "Booth Phone": "6297442556", "BLA SIR": "Madan Pradhan", "BLA Phone": "9382902037" },
    { "Shakti Kendra": "Saktikandra - 2", "Booth No": "107", "Booth Name": "Hope TG Primary School", "Booth Pramukh": "Tulshi Chhetri", "Booth Phone": "6297695834", "BLA SIR": "Satbhai Tamang", "BLA Phone": "9382577740" },
    { "Shakti Kendra": "Saktikandra - 2", "Booth No": "108", "Booth Name": "Hope TG Primary School", "Booth Pramukh": "Deep Roy", "Booth Phone": "9024012365", "BLA SIR": "Robin Basinab", "BLA Phone": "8772720915" },
    { "Shakti Kendra": "Saktikandra - 2", "Booth No": "109", "Booth Name": "Hilla Jhora Primary School", "Booth Pramukh": "Shyamali Ganju", "Booth Phone": "9734161440", "BLA SIR": "Ashik Suri", "BLA Phone": "6295935843" },
    { "Shakti Kendra": "Saktikandra - 3", "Booth No": "110", "Booth Name": "Lower Hilla TG Primary School", "Booth Pramukh": "Dinu Keherwar", "Booth Phone": "7908545626", "BLA SIR": "Gautam Majhi", "BLA Phone": "9832145431" },
    { "Shakti Kendra": "Saktikandra - 3", "Booth No": "111", "Booth Name": "Upper Hilla TG Primary School", "Booth Pramukh": "Raj Kumar Sharma", "Booth Phone": "9564546166", "BLA SIR": "Rajendra Oron", "BLA Phone": "8617468528" },
    { "Shakti Kendra": "Saktikandra - 4", "Booth No": "112", "Booth Name": "Nagrakata Line S.S.K.", "Booth Pramukh": "Rajendra Oron", "Booth Phone": "8617468528", "BLA SIR": "Rajendra Oron", "BLA Phone": "8617468528" },
    { "Shakti Kendra": "Saktikandra - 4", "Booth No": "113", "Booth Name": "Nagrakata T.G. Football Line I.C.D.S. (Centre No 18)", "Booth Pramukh": "Suresh Mahalli", "Booth Phone": "8101758171", "BLA SIR": "Suresh Mahalli", "BLA Phone": "8101758171" }
];

function showStatus(msg, type) {
    let statusDiv = document.getElementById('statusMsg');
    statusDiv.textContent = msg;
    statusDiv.className = 'status ' + type;
    setTimeout(() => { statusDiv.style.display = 'none'; }, 3000);
    statusDiv.style.display = 'block';
}

function updateStats() {
    document.getElementById('totalBooths').innerText = boothData.length;
    let uniqueShakti = [...new Set(boothData.map(row => row['Shakti Kendra']))];
    document.getElementById('totalShakti').innerText = uniqueShakti.length;
    let totalWorkers = boothData.length * 2;
    document.getElementById('totalWorkers').innerText = totalWorkers;
    
    // Update filter dropdown
    let filterSelect = document.getElementById('filterShakti');
    let currentVal = filterSelect.value;
    filterSelect.innerHTML = '<option value="">সব শক্তি কেন্দ্র</option>';
    uniqueShakti.forEach(shakti => {
        let option = document.createElement('option');
        option.value = shakti;
        option.textContent = shakti;
        if (currentVal === shakti) option.selected = true;
        filterSelect.appendChild(option);
    });
}

function renderTable() {
    let searchTerm = document.getElementById('searchBox').value.toLowerCase();
    let filterShakti = document.getElementById('filterShakti').value;
    
    let filtered = boothData.filter(row => {
        let matchSearch = JSON.stringify(row).toLowerCase().includes(searchTerm);
        let matchShakti = filterShakti === '' || row['Shakti Kendra'] === filterShakti;
        return matchSearch && matchShakti;
    });
    
    let tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    filtered.forEach((row, idx) => {
        let tr = tbody.insertRow();
        tr.insertCell(0).innerText = idx + 1;
        tr.insertCell(1).innerText = row['Shakti Kendra'] || '';
        tr.insertCell(2).innerText = row['Booth No'] || '';
        tr.insertCell(3).innerText = row['Booth Name'] || '';
        tr.insertCell(4).innerText = row['Booth Pramukh'] || '';
        tr.insertCell(5).innerHTML = `<a href="tel:${row['Booth Phone']}" style="text-decoration:none;color:#1a73e8;">📞 ${row['Booth Phone']}</a>`;
        tr.insertCell(6).innerText = row['BLA SIR'] || '';
        tr.insertCell(7).innerHTML = `<a href="tel:${row['BLA Phone']}" style="text-decoration:none;color:#1a73e8;">📞 ${row['BLA Phone']}</a>`;
        let actionCell = tr.insertCell(8);
        
        let editBtn = document.createElement('button');
        editBtn.innerText = '✏️';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => openEditModal(row);
        
        let delBtn = document.createElement('button');
        delBtn.innerText = '🗑️';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => { 
            if(confirm('মুছে ফেলতে চান?')) { 
                boothData = boothData.filter(r => r !== row); 
                renderTable(); 
                updateStats();
                showStatus('মুছে ফেলা হয়েছে', 'success'); 
            } 
        };
        
        actionCell.appendChild(editBtn);
        actionCell.appendChild(delBtn);
    });
}

function openEditModal(row) {
    let index = boothData.indexOf(row);
    document.getElementById('editIndex').value = index;
    document.getElementById('editShakti').value = row['Shakti Kendra'] || '';
    document.getElementById('editBoothNo').value = row['Booth No'] || '';
    document.getElementById('editBoothName').value = row['Booth Name'] || '';
    document.getElementById('editPramukh').value = row['Booth Pramukh'] || '';
    document.getElementById('editPramukhPhone').value = row['Booth Phone'] || '';
    document.getElementById('editBLA').value = row['BLA SIR'] || '';
    document.getElementById('editBLAPhone').value = row['BLA Phone'] || '';
    document.getElementById('modalTitle').innerText = 'এন্ট্রি এডিট করুন';
    document.getElementById('editModal').style.display = 'flex';
}

document.getElementById('saveBtn').onclick = () => {
    let idx = document.getElementById('editIndex').value;
    let newRow = {
        'Shakti Kendra': document.getElementById('editShakti').value,
        'Booth No': document.getElementById('editBoothNo').value,
        'Booth Name': document.getElementById('editBoothName').value,
        'Booth Pramukh': document.getElementById('editPramukh').value,
        'Booth Phone': document.getElementById('editPramukhPhone').value,
        'BLA SIR': document.getElementById('editBLA').value,
        'BLA Phone': document.getElementById('editBLAPhone').value
    };
    
    if (idx === '' || idx === '-1') {
        boothData.push(newRow);
        showStatus('নতুন এন্ট্রি যোগ হয়েছে', 'success');
    } else {
        boothData[idx] = newRow;
        showStatus('হালনাগাদ করা হয়েছে', 'success');
    }
    renderTable();
    updateStats();
    document.getElementById('editModal').style.display = 'none';
};

document.getElementById('cancelBtn').onclick = () => {
    document.getElementById('editModal').style.display = 'none';
};

document.getElementById('addNewBtn').onclick = () => {
    document.getElementById('editIndex').value = '';
    document.getElementById('editShakti').value = '';
    document.getElementById('editBoothNo').value = '';
    document.getElementById('editBoothName').value = '';
    document.getElementById('editPramukh').value = '';
    document.getElementById('editPramukhPhone').value = '';
    document.getElementById('editBLA').value = '';
    document.getElementById('editBLAPhone').value = '';
    document.getElementById('modalTitle').innerText = 'নতুন এন্ট্রি যোগ করুন';
    document.getElementById('editModal').style.display = 'flex';
};

document.getElementById('resetDataBtn').onclick = () => {
    if(confirm('সব ডেটা রিস্টোর করে ডিফল্ট ডেটা লোড করতে চান? আপনার করা সব পরিবর্তন মুছে যাবে।')) {
        boothData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        renderTable();
        updateStats();
        showStatus('ডিফল্ট ডেটা রিস্টোর করা হয়েছে', 'success');
    }
};

document.getElementById('fileInput').addEventListener('change', function(e) {
    let file = e.target.files[0];
    if(!file) return;
    document.getElementById('fileName').innerText = file.name;
    let fileName = file.name;
    
    if(fileName.endsWith('.json')) {
        let reader = new FileReader();
        reader.onload = function(evt) {
            try {
                let loadedData = JSON.parse(evt.target.result);
                if(Array.isArray(loadedData)) {
                    boothData = loadedData;
                    renderTable();
                    updateStats();
                    showStatus('JSON ফাইল সফলভাবে লোড হয়েছে', 'success');
                } else {
                    showStatus('JSON ফাইলটি একটি অ্যারে হতে হবে', 'error');
                }
            } catch(err) { 
                showStatus('JSON পার্স করতে সমস্যা: ' + err.message, 'error'); 
            }
        };
        reader.readAsText(file);
    } else if(fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        let reader = new FileReader();
        reader.onload = function(evt) {
            let data = new Uint8Array(evt.target.result);
            let workbook = XLSX.read(data, {type: 'array'});
            let sheet = workbook.Sheets[workbook.SheetNames[0]];
            let rows = XLSX.utils.sheet_to_json(sheet);
            boothData = rows;
            renderTable();
            updateStats();
            showStatus('Excel ফাইল সফলভাবে লোড হয়েছে', 'success');
        };
        reader.readAsArrayBuffer(file);
    } else {
        showStatus('শুধু JSON বা Excel ফাইল সাপোর্টেড', 'error');
    }
});

document.getElementById('downloadJsonBtn').onclick = () => {
    let dataStr = JSON.stringify(boothData, null, 2);
    let blob = new Blob([dataStr], {type: 'application/json'});
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'booth_data_' + new Date().toISOString().slice(0,19).replace(/:/g, '-') + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showStatus('JSON ডাউনলোড হয়েছে', 'success');
};

document.getElementById('downloadExcelBtn').onclick = () => {
    let ws = XLSX.utils.json_to_sheet(boothData);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BoothData');
    XLSX.writeFile(wb, 'booth_data_' + new Date().toISOString().slice(0,19).replace(/:/g, '-') + '.xlsx');
    showStatus('Excel ডাউনলোড হয়েছে', 'success');
};

document.getElementById('searchBox').addEventListener('keyup', renderTable);
document.getElementById('filterShakti').addEventListener('change', renderTable);

// Initialize with default data
boothData = JSON.parse(JSON.stringify(DEFAULT_DATA));
renderTable();
updateStats();

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('SW registration failed:', err));
}
