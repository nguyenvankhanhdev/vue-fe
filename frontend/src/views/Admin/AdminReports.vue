<template>
  <div class="admin-reports">
    <div class="container-fluid px-4">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="h3 mb-0 text-gray-800">Báo cáo & Thống kê</h1>
              <p class="text-muted">Xem báo cáo doanh thu và thống kê kinh doanh</p>
            </div>
            <div class="btn-group">
              <button class="btn btn-outline-success">
                <i class="fas fa-file-excel me-2"></i>
                Xuất Excel
              </button>
              <button class="btn btn-outline-danger">
                <i class="fas fa-file-pdf me-2"></i>
                Xuất PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow">
        <div class="card-body">
          <div class="text-center py-5">
            <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
            <h4>Trang báo cáo & thống kê</h4>
            <p class="text-muted">Chức năng đang được phát triển...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic will be implemented here
</script>

<style scoped>
.admin-reports {
  background-color: #f8f9fc;
  min-height: 100vh;
  padding: 2rem 0;
}
</style>