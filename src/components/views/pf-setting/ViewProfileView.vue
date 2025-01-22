<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-4">
                <div class="profile">
                    <div class="profile-img">
                        <img src="/src/assets/images/imgprofile.png" alt="Profile Image">
                    </div>
                    <div class="profile-info">
                        <h1 class="fw-bold">សុខ កញ្ញា</h1>
                    </div>
                </div>
                <div class="profile-menu">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-gear me-2"></i> គណនី
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-key me-2"></i> វិធីសាស្រ្តចូលគណី
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-arrow-repeat me-2"></i> ប្រវត្តិប្រើប្រាស់
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-geo-alt-fill me-2"></i> រៀបចំដឹកជញ្ជូន
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-pencil-square me-2"></i> កែប្រែព័ត៌មាន
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-trash3 me-2"></i> លុបគណី
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-8">
                <div class="info-display">
                    <!-- Information Content Goes Here -->
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    background-color: #f8f9fa; /* Light gray background */
    border-radius: 10px;
}

.profile {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
    background-color: #28a745; /* Green background */

}

.profile-img {
    position: relative;
    overflow: hidden;
    width: 150px;
    height: 150px;
    margin: 0 auto;
}
.profile-img img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

.profile-info h1 {
    font-size:48px;
    color: #fff;
}

.profile-menu ul {
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    list-style-type: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-menu li {
    margin-bottom: 10px;
}

.profile-menu a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.profile-menu a:hover {
    background-color: #e9ecef;
    color: #007bff;
}
</style>
