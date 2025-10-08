<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="hero-content">
          <h1>Về chúng tôi</h1>
          <p class="hero-subtitle">
            Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng cao và dịch vụ tốt nhất
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <h3>10+</h3>
              <p>Năm kinh nghiệm</p>
            </div>
            <div class="stat-item">
              <h3>50K+</h3>
              <p>Khách hàng hài lòng</p>
            </div>
            <div class="stat-item">
              <h3>100+</h3>
              <p>Sản phẩm chất lượng</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap">
          <div class="col-lg-6">
            <div class="story-content">
              <h2>Câu chuyện của chúng tôi</h2>
              <p class="story-intro">
                Được thành lập vào năm 2014, chúng tôi bắt đầu với một ý tưởng đơn giản: 
                mang đến cho người tiêu dùng những sản phẩm chất lượng cao với giá cả hợp lý.
              </p>
              
              <div class="story-timeline">
                <div class="timeline-item">
                  <div class="timeline-year">2014</div>
                  <div class="timeline-content">
                    <h4>Khởi nghiệp</h4>
                    <p>Thành lập công ty với 3 nhân viên đầu tiên và văn phòng nhỏ tại TP.HCM</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-year">2017</div>
                  <div class="timeline-content">
                    <h4>Mở rộng</h4>
                    <p>Ra mắt website bán hàng online và mở chi nhánh thứ hai tại Hà Nội</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-year">2020</div>
                  <div class="timeline-content">
                    <h4>Chuyển đổi số</h4>
                    <p>Đầu tư mạnh vào công nghệ và phát triển ứng dụng di động</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-year">2025</div>
                  <div class="timeline-content">
                    <h4>Hiện tại</h4>
                    <p>Trở thành một trong những thương hiệu uy tín hàng đầu Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="story-images">
              <div class="image-grid">
                <div class="image-item large">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400" alt="Văn phòng hiện đại" />
                </div>
                <div class="image-item">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200" alt="Nhóm làm việc" />
                </div>
                <div class="image-item">
                  <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=200" alt="Sản phẩm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="mission-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mission-grid">
          <div class="mission-item">
            <div class="mission-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>Sứ mệnh</h3>
            <p>
              Mang đến cho khách hàng những sản phẩm chất lượng cao, dịch vụ tận tâm 
              và trải nghiệm mua sắm tuyệt vời nhất.
            </p>
          </div>
          
          <div class="mission-item">
            <div class="mission-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>Tầm nhìn</h3>
            <p>
              Trở thành thương hiệu hàng đầu trong lĩnh vực thương mại điện tử tại Việt Nam 
              và mở rộng ra khu vực Đông Nam Á.
            </p>
          </div>
          
          <div class="mission-item">
            <div class="mission-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3>Giá trị cốt lõi</h3>
            <p>
              Chất lượng, uy tín, sáng tạo và luôn lấy khách hàng làm trung tâm 
              trong mọi hoạt động kinh doanh.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="section-header text-center">
          <h2>Đội ngũ của chúng tôi</h2>
          <p>Những con người tài năng và tận tâm đằng sau thành công của chúng tôi</p>
        </div>
        
        <div class="team-grid">
          <div 
            v-for="member in teamMembers" 
            :key="member.id"
            class="team-member"
          >
            <div class="member-image">
              <img :src="member.image" :alt="member.name" />
              <div class="member-overlay">
                <div class="social-links">
                  <a v-if="member.linkedin" :href="member.linkedin" class="social-link">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a v-if="member.twitter" :href="member.twitter" class="social-link">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a v-if="member.email" :href="`mailto:${member.email}`" class="social-link">
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="section-header text-center">
          <h2>Giá trị cốt lõi</h2>
          <p>Những nguyên tắc định hướng mọi hành động của chúng tôi</p>
        </div>
        
        <div class="values-grid">
          <div 
            v-for="value in coreValues" 
            :key="value.id"
            class="value-item"
          >
            <div class="value-icon">
              <i :class="value.icon"></i>
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="achievements-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap">
          <div class="col-lg-6">
            <div class="achievements-content">
              <h2>Thành tựu của chúng tôi</h2>
              <p class="achievements-intro">
                Trong suốt hành trình phát triển, chúng tôi đã đạt được nhiều thành tựu đáng tự hào
                và nhận được sự tin tưởng từ khách hàng cũng như đối tác.
              </p>
              
              <div class="achievements-list">
                <div 
                  v-for="achievement in achievements" 
                  :key="achievement.id"
                  class="achievement-item"
                >
                  <div class="achievement-icon">
                    <i :class="achievement.icon"></i>
                  </div>
                  <div class="achievement-content">
                    <h4>{{ achievement.title }}</h4>
                    <p>{{ achievement.description }}</p>
                    <span class="achievement-year">{{ achievement.year }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="statistics-cards">
              <div 
                v-for="stat in statistics" 
                :key="stat.id"
                class="stat-card"
              >
                <div class="stat-icon">
                  <i :class="stat.icon"></i>
                </div>
                <div class="stat-content">
                  <h3>{{ stat.number }}</h3>
                  <p>{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Commitment Section -->
    <section class="commitment-section py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2>Cam kết của chúng tôi</h2>
        <p class="commitment-subtitle">
          Chúng tôi luôn cam kết mang đến cho bạn trải nghiệm mua sắm tốt nhất
        </p>
        
        <div class="commitment-grid">
          <div class="commitment-item">
            <div class="commitment-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Đảm bảo chất lượng</h4>
            <p>100% sản phẩm chính hãng với chế độ bảo hành toàn diện</p>
          </div>
          
          <div class="commitment-item">
            <div class="commitment-icon">
              <i class="fas fa-shipping-fast"></i>
            </div>
            <h4>Giao hàng nhanh chóng</h4>
            <p>Giao hàng trong 24h tại nội thành và 2-3 ngày toàn quốc</p>
          </div>
          
          <div class="commitment-item">
            <div class="commitment-icon">
              <i class="fas fa-headset"></i>
            </div>
            <h4>Hỗ trợ 24/7</h4>
            <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn</p>
          </div>
          
          <div class="commitment-item">
            <div class="commitment-icon">
              <i class="fas fa-undo-alt"></i>
            </div>
            <h4>Đổi trả dễ dàng</h4>
            <p>Chính sách đổi trả linh hoạt trong vòng 30 ngày</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2>Sẵn sàng trải nghiệm?</h2>
        <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi</p>
        <div class="cta-buttons">
          <router-link to="/products" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
            <i class="fas fa-shopping-bag"></i>
            Khám phá sản phẩm
          </router-link>
          <router-link to="/contact" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 btn-outline">
            <i class="fas fa-phone"></i>
            Liên hệ ngay
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    position: 'CEO & Founder',
    bio: 'Với hơn 15 năm kinh nghiệm trong lĩnh vực thương mại điện tử',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    linkedin: '#',
    twitter: '#',
    email: 'ceo@example.com'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    position: 'CTO',
    bio: 'Chuyên gia công nghệ với kinh nghiệm phát triển các hệ thống quy mô lớn',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
    linkedin: '#',
    email: 'cto@example.com'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    position: 'Head of Marketing',
    bio: 'Dẫn dắt các chiến dịch marketing sáng tạo và hiệu quả',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    linkedin: '#',
    twitter: '#',
    email: 'marketing@example.com'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    position: 'Customer Success Manager',
    bio: 'Đảm bảo khách hàng luôn có trải nghiệm tốt nhất với sản phẩm',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    linkedin: '#',
    email: 'support@example.com'
  }
])

const coreValues = ref([
  {
    id: 1,
    icon: 'fas fa-star',
    title: 'Chất lượng',
    description: 'Chúng tôi cam kết chỉ cung cấp những sản phẩm và dịch vụ chất lượng cao nhất'
  },
  {
    id: 2,
    icon: 'fas fa-handshake',
    title: 'Uy tín',
    description: 'Xây dựng lòng tin với khách hàng thông qua sự minh bạch và trung thực'
  },
  {
    id: 3,
    icon: 'fas fa-lightbulb',
    title: 'Sáng tạo',
    description: 'Không ngừng đổi mới và cải tiến để mang đến giải pháp tốt nhất'
  },
  {
    id: 4,
    icon: 'fas fa-users',
    title: 'Khách hàng trung tâm',
    description: 'Luôn lắng nghe và đặt nhu cầu khách hàng lên hàng đầu'
  },
  {
    id: 5,
    icon: 'fas fa-leaf',
    title: 'Bền vững',
    description: 'Phát triển kinh doanh một cách có trách nhiệm với môi trường'
  },
  {
    id: 6,
    icon: 'fas fa-rocket',
    title: 'Tăng trưởng',
    description: 'Không ngừng học hỏi và phát triển cùng với thời đại'
  }
])

const achievements = ref([
  {
    id: 1,
    icon: 'fas fa-trophy',
    title: 'Top 10 Thương hiệu uy tín',
    description: 'Được bình chọn trong Top 10 thương hiệu uy tín nhất Việt Nam',
    year: '2024'
  },
  {
    id: 2,
    icon: 'fas fa-medal',
    title: 'Giải thưởng Dịch vụ xuất sắc',
    description: 'Nhận giải thưởng về chất lượng dịch vụ khách hàng xuất sắc',
    year: '2023'
  },
  {
    id: 3,
    icon: 'fas fa-certificate',
    title: 'Chứng nhận ISO 9001',
    description: 'Đạt chứng nhận quản lý chất lượng quốc tế ISO 9001:2015',
    year: '2022'
  },
  {
    id: 4,
    icon: 'fas fa-award',
    title: 'Startup của năm',
    description: 'Được vinh danh là Startup xuất sắc nhất trong lĩnh vực E-commerce',
    year: '2021'
  }
])

const statistics = ref([
  {
    id: 1,
    icon: 'fas fa-users',
    number: '50,000+',
    label: 'Khách hàng tin tưởng'
  },
  {
    id: 2,
    icon: 'fas fa-box',
    title: 'orders',
    number: '200,000+',
    label: 'Đơn hàng đã giao'
  },
  {
    id: 3,
    icon: 'fas fa-store',
    number: '15',
    label: 'Chi nhánh trên toàn quốc'
  },
  {
    id: 4,
    icon: 'fas fa-percentage',
    number: '99.5%',
    label: 'Tỷ lệ hài lòng khách hàng'
  }
])
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 50px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.stat-item p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.story-content h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 25px;
}

.story-intro {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 40px;
}

.story-timeline {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 25px;
}

.timeline-year {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: 700;
  min-width: 70px;
  text-align: center;
}

.timeline-content h4 {
  color: #333;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.timeline-content p {
  color: #666;
  line-height: 1.6;
}

.image-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 15px;
  height: 400px;
}

.image-item {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.image-item.large {
  grid-row: 1 / 3;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-item:hover img {
  transform: scale(1.05);
}

.mission-section {
  background: white;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.mission-item {
  text-align: center;
  padding: 40px 30px;
  background: #f8f9fa;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.mission-item:hover {
  background: white;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.mission-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 32px;
  color: white;
}

.mission-item h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}

.mission-item p {
  color: #666;
  line-height: 1.7;
}

.section-header {
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
}

.section-header p {
  font-size: 1.1rem;
  color: #666;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.team-member {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.member-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.member-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(231, 76, 60, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.team-member:hover .member-overlay {
  opacity: 1;
}

.team-member:hover .member-image img {
  transform: scale(1.1);
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: white;
  color: #e74c3c;
}

.member-info {
  padding: 30px 25px;
  text-align: center;
}

.member-info h4 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 8px;
}

.member-position {
  color: #e74c3c;
  font-weight: 600;
  margin-bottom: 15px;
}

.member-bio {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.value-item {
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.value-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: white;
}

.value-item h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 15px;
}

.value-item p {
  color: #666;
  line-height: 1.6;
}

.achievements-content h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 25px;
}

.achievements-intro {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 40px;
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.achievement-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f39c12, #e67e22);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
}

.achievement-content h4 {
  color: #333;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.achievement-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.achievement-year {
  color: #e74c3c;
  font-weight: 600;
  font-size: 14px;
}

.statistics-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 30px 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
  color: white;
}

.stat-card h3 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.stat-card p {
  color: #666;
  font-size: 14px;
}

.commitment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.commitment-item {
  padding: 30px 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.commitment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.commitment-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #28a745, #20c997);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: white;
}

.commitment-item h4 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
}

.commitment-item p {
  color: #666;
  line-height: 1.6;
}

.commitment-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #e74c3c;
  color: white;
  border: 2px solid #e74c3c;
}

.btn-primary:hover {
  background: #c0392b;
  border-color: #c0392b;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: white;
  color: #667eea;
}

.text-center {
  text-align: center;
}

.py-5 {
  padding: 3rem 0;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    gap: 30px;
  }
  
  .row {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .story-content h2,
  .achievements-content h2,
  .section-header h2 {
    font-size: 2rem;
  }
  
  .timeline-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    height: auto;
  }
  
  .image-item.large {
    grid-row: auto;
  }
  
  .statistics-cards {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>