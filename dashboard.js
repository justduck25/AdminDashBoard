// Dashboard JavaScript
// Global chart instances storage
window.dashboardCharts = {};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    initializeCharts();
    initializeNavigation();
    initializeResponsive();
});

// Dashboard initialization
function initializeDashboard() {
    // Add loading animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });

    // Add hover effects to activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Initialize search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Initialize notification dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotifications);
    }

    // Initialize user profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', toggleUserMenu);
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('pageTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav item
            document.querySelector('.nav-item.active').classList.remove('active');
            this.parentElement.classList.add('active');
            
            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
            
            // Update page title
            const titles = {
                'dashboard': 'Tổng quan',
                'users': 'Quản lý người dùng',
                'weddings': 'Sự kiện cưới',
                'templates': 'Mẫu thiệp',
                'payments': 'Thanh toán',
                'analytics': 'Thống kê',
                'settings': 'Cài đặt'
            };
            pageTitle.textContent = titles[targetPage] || 'Dashboard';
            
            // Load page content if needed
            loadPageContent(targetPage);
        });
    });
}

// Load page content dynamically
function loadPageContent(page) {
    const pageElement = document.getElementById(page);
    
    switch(page) {
        case 'weddings':
            loadWeddingsPage(pageElement);
            break;
        case 'templates':
            loadTemplatesPage(pageElement);
            break;
        case 'payments':
            loadPaymentsPage(pageElement);
            break;
        case 'analytics':
            loadAnalyticsPage(pageElement);
            break;
        case 'settings':
            loadSettingsPage(pageElement);
            break;
    }
}

// Load Weddings Page
function loadWeddingsPage(pageElement) {
    if (pageElement.children.length > 0) return; // Already loaded
    
    const weddingsHTML = `
        <div class="page-header">
            <h2>Quản lý sự kiện cưới</h2>
            <button class="btn btn-primary">
                <i class="fas fa-plus"></i>
                Thêm sự kiện
            </button>
        </div>
        
        <div class="stats-grid" style="margin-bottom: 24px;">
            <div class="stat-card">
                <div class="stat-icon weddings">
                    <i class="fas fa-ring"></i>
                </div>
                <div class="stat-content">
                    <h3>1,234</h3>
                    <p>Tổng sự kiện</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon users">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                    <h3>89</h3>
                    <p>Sự kiện tháng này</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon revenue">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="stat-content">
                    <h3>456</h3>
                    <p>Sự kiện hoàn thành</p>
                </div>
            </div>
        </div>
        
        <div class="filters">
            <div class="filter-group">
                <select class="filter-select">
                    <option>Tất cả trạng thái</option>
                    <option>Đang lên kế hoạch</option>
                    <option>Sắp diễn ra</option>
                    <option>Đã hoàn thành</option>
                </select>
                <input type="date" class="filter-input">
                <input type="text" class="filter-input" placeholder="Tìm kiếm theo tên cặp đôi...">
            </div>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cặp đôi</th>
                        <th>Ngày cưới</th>
                        <th>Địa điểm</th>
                        <th>Ngân sách</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="user-info">
                                <img src="https://via.placeholder.com/40x40/ff6b9d/ffffff?text=M&N" alt="Couple" class="user-avatar">
                                <div>
                                    <div class="user-name">Mai & Nam</div>
                                    <div class="user-role">Đã đăng ký 2 tháng</div>
                                </div>
                            </div>
                        </td>
                        <td>25/12/2024</td>
                        <td>Khách sạn Rex, TP.HCM</td>
                        <td>₫150.000.000</td>
                        <td><span class="status status-active">Đang lên kế hoạch</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-edit" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-action btn-delete" title="Xóa">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="user-info">
                                <img src="https://via.placeholder.com/40x40/4f46e5/ffffff?text=H&D" alt="Couple" class="user-avatar">
                                <div>
                                    <div class="user-name">Hoa & Dũng</div>
                                    <div class="user-role">Đã đăng ký 1 tháng</div>
                                </div>
                            </div>
                        </td>
                        <td>15/01/2025</td>
                        <td>Nhà hàng Riverside, Hà Nội</td>
                        <td>₫200.000.000</td>
                        <td><span class="status status-active">Sắp diễn ra</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-edit" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-action btn-delete" title="Xóa">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="pagination">
            <button class="pagination-btn" disabled>
                <i class="fas fa-chevron-left"></i>
            </button>
            <span class="pagination-info">Trang 1 / 15</span>
            <button class="pagination-btn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    pageElement.innerHTML = weddingsHTML;
}

// Load Templates Page
function loadTemplatesPage(pageElement) {
    if (pageElement.children.length > 0) return;
    
    const templatesHTML = `
        <div class="page-header">
            <h2>Quản lý mẫu thiệp</h2>
            <button class="btn btn-primary">
                <i class="fas fa-plus"></i>
                Thêm mẫu thiệp
            </button>
        </div>
        
        <div class="stats-grid" style="margin-bottom: 24px;">
            <div class="stat-card">
                <div class="stat-icon templates">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="stat-content">
                    <h3>156</h3>
                    <p>Tổng mẫu thiệp</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon users">
                    <i class="fas fa-crown"></i>
                </div>
                <div class="stat-content">
                    <h3>89</h3>
                    <p>Mẫu VIP</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon weddings">
                    <i class="fas fa-download"></i>
                </div>
                <div class="stat-content">
                    <h3>2,847</h3>
                    <p>Lượt sử dụng</p>
                </div>
            </div>
        </div>
        
        <div class="filters">
            <div class="filter-group">
                <select class="filter-select">
                    <option>Tất cả loại</option>
                    <option>Miễn phí</option>
                    <option>VIP</option>
                </select>
                <select class="filter-select">
                    <option>Tất cả danh mục</option>
                    <option>Cổ điển</option>
                    <option>Hiện đại</option>
                    <option>Tối giản</option>
                </select>
                <input type="text" class="filter-input" placeholder="Tìm kiếm theo tên mẫu...">
            </div>
        </div>
        
        <div class="templates-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
            <div class="template-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(135deg, #ff6b9d, #f093fb); position: relative;">
                    <div style="position: absolute; top: 12px; right: 12px;">
                        <span class="badge badge-vip">VIP</span>
                    </div>
                    <div style="position: absolute; bottom: 12px; left: 12px; color: white;">
                        <h4 style="margin: 0; font-size: 18px;">Romantic Pink</h4>
                    </div>
                </div>
                <div style="padding: 16px;">
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 12px;">Mẫu thiệp cưới lãng mạn với tông màu hồng</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; color: #64748b;">234 lượt sử dụng</span>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" title="Chỉnh sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-action btn-delete" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="template-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); position: relative;">
                    <div style="position: absolute; top: 12px; right: 12px;">
                        <span class="badge badge-free">FREE</span>
                    </div>
                    <div style="position: absolute; bottom: 12px; left: 12px; color: white;">
                        <h4 style="margin: 0; font-size: 18px;">Classic Blue</h4>
                    </div>
                </div>
                <div style="padding: 16px;">
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 12px;">Mẫu thiệp cưới cổ điển với tông màu xanh</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; color: #64748b;">189 lượt sử dụng</span>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" title="Chỉnh sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-action btn-delete" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="template-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(135deg, #10b981, #059669); position: relative;">
                    <div style="position: absolute; top: 12px; right: 12px;">
                        <span class="badge badge-vip">VIP</span>
                    </div>
                    <div style="position: absolute; bottom: 12px; left: 12px; color: white;">
                        <h4 style="margin: 0; font-size: 18px;">Nature Green</h4>
                    </div>
                </div>
                <div style="padding: 16px;">
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 12px;">Mẫu thiệp cưới tự nhiên với tông màu xanh lá</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; color: #64748b;">156 lượt sử dụng</span>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" title="Chỉnh sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-action btn-delete" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="pagination">
            <button class="pagination-btn" disabled>
                <i class="fas fa-chevron-left"></i>
            </button>
            <span class="pagination-info">Trang 1 / 8</span>
            <button class="pagination-btn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    pageElement.innerHTML = templatesHTML;
}

// Load Payments Page
function loadPaymentsPage(pageElement) {
    if (pageElement.children.length > 0) return;
    
    const paymentsHTML = `
        <div class="page-header">
            <h2>Quản lý thanh toán</h2>
            <button class="btn btn-primary">
                <i class="fas fa-download"></i>
                Xuất báo cáo
            </button>
        </div>
        
        <div class="stats-grid" style="margin-bottom: 24px;">
            <div class="stat-card">
                <div class="stat-icon revenue">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-content">
                    <h3>₫45.2M</h3>
                    <p>Doanh thu tháng</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon users">
                    <i class="fas fa-credit-card"></i>
                </div>
                <div class="stat-content">
                    <h3>1,847</h3>
                    <p>Giao dịch</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon weddings">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <h3>₫24,500</h3>
                    <p>Giá trị TB</p>
                </div>
            </div>
        </div>
        
        <div class="filters">
            <div class="filter-group">
                <select class="filter-select">
                    <option>Tất cả trạng thái</option>
                    <option>Thành công</option>
                    <option>Đang xử lý</option>
                    <option>Thất bại</option>
                </select>
                <input type="date" class="filter-input">
                <input type="text" class="filter-input" placeholder="Tìm kiếm theo mã giao dịch...">
            </div>
        </div>
        
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Mã GD</th>
                        <th>Người dùng</th>
                        <th>Gói</th>
                        <th>Số tiền</th>
                        <th>Ngày</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>#TXN001234</code></td>
                        <td>
                            <div class="user-info">
                                <img src="https://via.placeholder.com/40x40/ff6b9d/ffffff?text=NT" alt="User" class="user-avatar">
                                <div>
                                    <div class="user-name">Nguyễn Thị Mai</div>
                                    <div class="user-role">mai.nguyen@email.com</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge badge-vip">VIP</span></td>
                        <td><strong>₫299,000</strong></td>
                        <td>23/10/2024</td>
                        <td><span class="status status-active">Thành công</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-edit" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-action" style="background: #e0f2fe; color: #0284c7;" title="In hóa đơn">
                                    <i class="fas fa-print"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="pagination">
            <button class="pagination-btn" disabled>
                <i class="fas fa-chevron-left"></i>
            </button>
            <span class="pagination-info">Trang 1 / 25</span>
            <button class="pagination-btn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    pageElement.innerHTML = paymentsHTML;
}

// Load Analytics Page
function loadAnalyticsPage(pageElement) {
    if (pageElement.children.length > 0) return;
    
    const analyticsHTML = `
        <div class="page-header">
            <h2>Thống kê & Báo cáo</h2>
            <div style="display: flex; gap: 12px;">
                <select class="filter-select">
                    <option>30 ngày gần đây</option>
                    <option>3 tháng gần đây</option>
                    <option>6 tháng gần đây</option>
                    <option>1 năm gần đây</option>
                </select>
                <button class="btn btn-primary">
                    <i class="fas fa-download"></i>
                    Xuất báo cáo
                </button>
            </div>
        </div>
        
        <div class="stats-grid" style="margin-bottom: 32px;">
            <div class="stat-card">
                <div class="stat-icon users">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <h3>2,847</h3>
                    <p>Tổng người dùng</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon weddings">
                    <i class="fas fa-ring"></i>
                </div>
                <div class="stat-content">
                    <h3>1,234</h3>
                    <p>Sự kiện cưới</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon revenue">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-content">
                    <h3>₫45.2M</h3>
                    <p>Doanh thu</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon templates">
                    <i class="fas fa-percentage"></i>
                </div>
                <div class="stat-content">
                    <h3>23.4%</h3>
                    <p>Tỷ lệ chuyển đổi</p>
                </div>
            </div>
        </div>
        
        <div class="charts-section" style="margin-bottom: 32px;">
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Doanh thu theo tháng</h3>
                </div>
                <div class="chart-content">
                    <canvas id="revenueAnalyticsChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Phân bố gói dịch vụ</h3>
                </div>
                <div class="chart-content">
                    <canvas id="packageDistributionChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-bottom: 20px; color: #1e293b;">Top mẫu thiệp phổ biến</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
                        <span>Romantic Pink</span>
                        <span style="font-weight: 600; color: #ff6b9d;">234 lượt</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
                        <span>Classic Blue</span>
                        <span style="font-weight: 600; color: #3b82f6;">189 lượt</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
                        <span>Nature Green</span>
                        <span style="font-weight: 600; color: #10b981;">156 lượt</span>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-bottom: 20px; color: #1e293b;">Thống kê theo khu vực</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
                        <span>TP. Hồ Chí Minh</span>
                        <span style="font-weight: 600; color: #1e293b;">45%</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
                        <span>Hà Nội</span>
                        <span style="font-weight: 600; color: #1e293b;">32%</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
                        <span>Khác</span>
                        <span style="font-weight: 600; color: #1e293b;">23%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    pageElement.innerHTML = analyticsHTML;
    
    // Initialize analytics charts
    setTimeout(() => {
        initializeAnalyticsCharts();
    }, 100);
}

// Load Settings Page
function loadSettingsPage(pageElement) {
    if (pageElement.children.length > 0) return;
    
    const settingsHTML = `
        <div class="page-header">
            <h2>Cài đặt hệ thống</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="margin-bottom: 20px; color: #1e293b;">Menu cài đặt</h3>
                <nav style="display: flex; flex-direction: column; gap: 8px;">
                    <a href="#" class="settings-nav-link active" data-setting="general">
                        <i class="fas fa-cog"></i>
                        Cài đặt chung
                    </a>
                    <a href="#" class="settings-nav-link" data-setting="users">
                        <i class="fas fa-users"></i>
                        Quản lý người dùng
                    </a>
                    <a href="#" class="settings-nav-link" data-setting="payments">
                        <i class="fas fa-credit-card"></i>
                        Cài đặt thanh toán
                    </a>
                    <a href="#" class="settings-nav-link" data-setting="notifications">
                        <i class="fas fa-bell"></i>
                        Thông báo
                    </a>
                    <a href="#" class="settings-nav-link" data-setting="security">
                        <i class="fas fa-shield-alt"></i>
                        Bảo mật
                    </a>
                </nav>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div id="settings-content">
                    <h3 style="margin-bottom: 20px; color: #1e293b;">Cài đặt chung</h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Tên ứng dụng</label>
                            <input type="text" value="HyPlanner" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email liên hệ</label>
                            <input type="email" value="admin@hyplanner.com" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Múi giờ</label>
                            <select style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <option>UTC+7 (Việt Nam)</option>
                                <option>UTC+0 (GMT)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Ngôn ngữ mặc định</label>
                            <select style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <option>Tiếng Việt</option>
                                <option>English</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="maintenance" checked>
                            <label for="maintenance">Bật chế độ bảo trì</label>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" id="registration" checked>
                            <label for="registration">Cho phép đăng ký mới</label>
                        </div>
                        
                        <div style="margin-top: 24px;">
                            <button class="btn btn-primary">
                                <i class="fas fa-save"></i>
                                Lưu cài đặt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    pageElement.innerHTML = settingsHTML;
    
    // Add settings navigation functionality
    const settingsNavLinks = pageElement.querySelectorAll('.settings-nav-link');
    settingsNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active link
            settingsNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update content based on selection
            const setting = this.getAttribute('data-setting');
            updateSettingsContent(setting);
        });
    });
}

// Update settings content
function updateSettingsContent(setting) {
    const content = document.getElementById('settings-content');
    
    const contents = {
        general: `
            <h3 style="margin-bottom: 20px; color: #1e293b;">Cài đặt chung</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Tên ứng dụng</label>
                    <input type="text" value="HyPlanner" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email liên hệ</label>
                    <input type="email" value="admin@hyplanner.com" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
                <div style="margin-top: 24px;">
                    <button class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        Lưu cài đặt
                    </button>
                </div>
            </div>
        `,
        users: `
            <h3 style="margin-bottom: 20px; color: #1e293b;">Quản lý người dùng</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="auto-approve" checked>
                    <label for="auto-approve">Tự động phê duyệt tài khoản mới</label>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="email-verification" checked>
                    <label for="email-verification">Yêu cầu xác thực email</label>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Số lượng tài khoản tối đa</label>
                    <input type="number" value="10000" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
            </div>
        `,
        payments: `
            <h3 style="margin-bottom: 20px; color: #1e293b;">Cài đặt thanh toán</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">PayOS Client ID</label>
                    <input type="text" value="****-****-****" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">PayOS API Key</label>
                    <input type="password" value="****-****-****" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="test-mode" checked>
                    <label for="test-mode">Chế độ test</label>
                </div>
            </div>
        `,
        notifications: `
            <h3 style="margin-bottom: 20px; color: #1e293b;">Cài đặt thông báo</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="email-notifications" checked>
                    <label for="email-notifications">Gửi thông báo qua email</label>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="sms-notifications">
                    <label for="sms-notifications">Gửi thông báo qua SMS</label>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">SMTP Server</label>
                    <input type="text" value="smtp.gmail.com" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
            </div>
        `,
        security: `
            <h3 style="margin-bottom: 20px; color: #1e293b;">Cài đặt bảo mật</h3>
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input type="checkbox" id="two-factor" checked>
                    <label for="two-factor">Bắt buộc xác thực 2 bước</label>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Thời gian hết hạn session (phút)</label>
                    <input type="number" value="60" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Số lần đăng nhập sai tối đa</label>
                    <input type="number" value="5" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                </div>
            </div>
        `
    };
    
    content.innerHTML = contents[setting] || contents.general;
}


// Initialize charts
function initializeCharts() {
    // User Chart
    const userCtx = document.getElementById('userChart');
    if (userCtx) {
        window.dashboardCharts.userChart = new Chart(userCtx, {
            type: 'line',
            data: {
                labels: ['T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
                datasets: [{
                    label: 'Người dùng mới',
                    data: [0, 0, 0, 0, 25, 24], // T5-T8: 0, T9: 25, T10: 24
                    borderColor: '#ff6b9d',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Revenue Chart - Mock data
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        window.dashboardCharts.revenueChart = new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['FREE', 'VIP'],
                datasets: [{
                    data: [45, 4], // FREE = 45, VIP = 4
                    backgroundColor: ['#e2e8f0', '#fbbf24'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Initialize analytics charts
function initializeAnalyticsCharts() {
    // Revenue Analytics Chart
    const revenueAnalyticsCtx = document.getElementById('revenueAnalyticsChart');
    if (revenueAnalyticsCtx) {
        window.dashboardCharts.revenueAnalyticsChart = new Chart(revenueAnalyticsCtx, {
            type: 'bar',
            data: {
                labels: ['T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
                datasets: [{
                    label: 'Doanh thu (triệu VNĐ)',
                    data: [25, 35, 40, 45, 38, 45],
                    backgroundColor: 'rgba(255, 107, 157, 0.8)',
                    borderColor: '#ff6b9d',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Package Distribution Chart
    const packageCtx = document.getElementById('packageDistributionChart');
    if (packageCtx) {
        window.dashboardCharts.packageDistributionChart = new Chart(packageCtx, {
            type: 'pie',
            data: {
                labels: ['FREE', 'VIP'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#64748b', '#f59e0b'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Responsive functionality
function initializeResponsive() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Function to resize all charts
    function resizeCharts() {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
            let resizedCount = 0;
            
            if (window.dashboardCharts) {
                Object.entries(window.dashboardCharts).forEach(([name, chart]) => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                        // Force update to ensure proper rendering
                        chart.update('none');
                        resizedCount++;
                        console.log(`Resized chart: ${name}`);
                    }
                });
            }
            
            // Fallback to Chart.instances if available
            if (window.Chart && Chart.instances) {
                Object.values(Chart.instances).forEach(chart => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                        chart.update('none');
                        resizedCount++;
                    }
                });
            }
            
            console.log(`Total charts resized: ${resizedCount}`);
        });
    }

    // Toggle mobile sidebar
    function toggleMobileSidebar(show) {
        if (isMobile()) {
            if (show) {
                sidebar.classList.add('open');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                sidebar.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                
                // Resize charts after mobile sidebar close
                setTimeout(resizeCharts, 100);
            }
        }
    }

    // Toggle desktop sidebar
    function toggleDesktopSidebar() {
        if (!isMobile()) {
            // Temporarily disable transitions to prevent horizontal scroll
            document.body.style.overflowX = 'hidden';
            
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // Multiple resize attempts to ensure charts update properly
            setTimeout(resizeCharts, 10);   // Immediate
            setTimeout(resizeCharts, 100);  // Early
            setTimeout(resizeCharts, 350);  // After transition
            
            // Re-enable after transition
            setTimeout(() => {
                document.body.style.overflowX = 'hidden'; // Keep hidden
            }, 300);
        }
    }

    // Sidebar toggle disabled to prevent chart resize issues
    // Desktop sidebar toggle disabled
    // if (sidebarToggle) {
    //     sidebarToggle.addEventListener('click', function(e) {
    //         e.stopPropagation();
    //         if (isMobile()) {
    //             toggleMobileSidebar(false);
    //         } else {
    //             toggleDesktopSidebar();
    //         }
    //     });
    // }

    // if (sidebarToggleBtn) {
    //     sidebarToggleBtn.addEventListener('click', function(e) {
    //         e.stopPropagation();
    //         toggleDesktopSidebar();
    //     });
    // }

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = sidebar.classList.contains('open');
            toggleMobileSidebar(!isOpen);
        });
    }

    // Mobile overlay click to close
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            toggleMobileSidebar(false);
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (isMobile() && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) && 
                !mobileOverlay.contains(e.target)) {
                toggleMobileSidebar(false);
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile sidebar when switching to desktop
        if (!isMobile()) {
            toggleMobileSidebar(false);
            sidebar.classList.remove('open');
        } else {
            // Reset desktop sidebar state on mobile
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
        
        // Recalculate chart sizes on resize
        setTimeout(resizeCharts, 300);
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isMobile()) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Swipe right to open sidebar (from left edge)
        if (touchStartX < 20 && deltaX > 50 && Math.abs(deltaY) < 100) {
            toggleMobileSidebar(true);
        }
        
        // Swipe left to close sidebar
        if (sidebar.classList.contains('open') && deltaX < -50 && Math.abs(deltaY) < 100) {
            toggleMobileSidebar(false);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile sidebar
        if (e.key === 'Escape' && isMobile() && sidebar.classList.contains('open')) {
            toggleMobileSidebar(false);
        }
    });

    // Initialize responsive tables
    initializeResponsiveTables();
}

// Initialize responsive tables
function initializeResponsiveTables() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        // Add touch scroll indicators for mobile
        const container = table.closest('.table-container');
        if (container) {
            // Add scroll indicators
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'table-scroll-indicator';
            scrollIndicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Vuốt để xem thêm';
            scrollIndicator.style.cssText = `
                display: none;
                text-align: center;
                padding: 8px;
                background: #f8fafc;
                color: #64748b;
                font-size: 12px;
                border-top: 1px solid #e2e8f0;
            `;
            
            // Show indicator on mobile
            function updateScrollIndicator() {
                if (window.innerWidth <= 768) {
                    const hasScroll = container.scrollWidth > container.clientWidth;
                    scrollIndicator.style.display = hasScroll ? 'block' : 'none';
                    if (hasScroll && !container.contains(scrollIndicator)) {
                        container.appendChild(scrollIndicator);
                    }
                } else {
                    scrollIndicator.style.display = 'none';
                }
            }
            
            // Update on load and resize
            updateScrollIndicator();
            window.addEventListener('resize', updateScrollIndicator);
            
            // Hide indicator when scrolling
            container.addEventListener('scroll', () => {
                if (scrollIndicator.style.display === 'block') {
                    scrollIndicator.style.opacity = '0.5';
                    clearTimeout(scrollIndicator.timeout);
                    scrollIndicator.timeout = setTimeout(() => {
                        scrollIndicator.style.opacity = '1';
                    }, 1000);
                }
            });
        }
        
        // Add mobile-friendly row click handlers
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function(e) {
                if (window.innerWidth <= 640 && !e.target.closest('.btn-action')) {
                    // On small screens, highlight the clicked row
                    rows.forEach(r => r.classList.remove('mobile-selected'));
                    this.classList.add('mobile-selected');
                    
                    // Auto-scroll to show action buttons
                    const actionButtons = this.querySelector('.action-buttons');
                    if (actionButtons) {
                        actionButtons.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest',
                            inline: 'end'
                        });
                    }
                }
            });
        });
    });
}

// Add mobile-selected row styles
const mobileRowStyles = document.createElement('style');
mobileRowStyles.textContent = `
    @media (max-width: 640px) {
        .data-table tr.mobile-selected {
            background-color: #fef3c7 !important;
            border-left: 3px solid #f59e0b;
        }
        
        .table-scroll-indicator {
            animation: fadeInOut 2s ease-in-out;
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
    }
`;
document.head.appendChild(mobileRowStyles);

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    console.log('Searching for:', query);
    // Implement search logic here
}

// Notification functionality
function toggleNotifications() {
    console.log('Toggle notifications');
    // Implement notification dropdown here
}

// User menu functionality
function toggleUserMenu() {
    console.log('Toggle user menu');
    // Implement user menu dropdown here
}

// Add settings navigation styles
const settingsStyles = `
.settings-nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: #64748b;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s;
}

.settings-nav-link:hover {
    background-color: #f1f5f9;
    color: #1e293b;
}

.settings-nav-link.active {
    background-color: #ff6b9d;
    color: white;
}

.settings-nav-link i {
    width: 20px;
    text-align: center;
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = settingsStyles;
document.head.appendChild(styleSheet);
