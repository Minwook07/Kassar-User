<template>
  <!-- Modal -->
  <div
    class="modal d-block show"
    id="exampleModal"
    aria-labelledby="exampleModalLabel"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
    >
      <div class="modal-content">
        <div class="modal-header py-4 px-3">
          <img
            src="@/assets/images/kassar_text.png"
            alt=""
            style="width: 120px"
          />

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card-body bg-my-default text-my-default px-4">
            <h1
              class="fs-5 text-center m-auto mb-4 text-decoration-underline text-primary"
              id="exampleModalLabel"
            >
              គោលការណ៍ក្នងការប្រើប្រាស់
            </h1>
            <p class="text-muted">
              <strong>កាលបរិច្ឆេទមានប្រសិទ្ធភាព:</strong>៣០ សីហា ២០២៤
            </p>
            <p>
              សូមស្វាគមន៍មកកាន់ CSC Express
              ដែលជាដៃគូដ៏គួរឱ្យទុកចិត្តរបស់អ្នកក្នុងការដឹកជញ្ជូន
              និងសេវាកម្មធ្វើដំណើរ។ ដោយ ការចូលប្រើ និងប្រើប្រាស់គេហទំព័ររបស់យើង
              អ្នកយល់ព្រមគោរពតាម និងត្រូវចងភ្ជាប់ដោយលក្ខខណ្ឌខាងក្រោម ប្រើ។
              សូមអានពួកវាដោយប្រុងប្រយ័ត្ន។
            </p>

            <h4 class="mt-4">1. ការទទួលយកលក្ខខណ្ឌ</h4>
            <p>
              ដោយប្រើគេហទំព័រ និងសេវាកម្មរបស់យើង អ្នកទទួលស្គាល់ថាអ្នកបានអាន យល់
              និងយល់ព្រម ក្លាយជា កំណត់ដោយលក្ខខណ្ឌប្រើប្រាស់ទាំងនេះ។
              ប្រសិនបើអ្នកមិនយល់ព្រមជាមួយផ្នែកណាមួយនៃលក្ខខណ្ឌទាំងនេះទេ
              អ្នកត្រូវតែ បញ្ឈប់ ការប្រើប្រាស់គេហទំព័រ និងសេវាកម្មរបស់យើង។
            </p>

            <h4 class="mt-4">2. ទំនួលខុសត្រូវរបស់អ្នកប្រើប្រាស់</h4>
            <ul class="list-group list-group-flush mb-4">
              <li class="list-group-item bg-my-default text-my-default">
                អ្នកប្រើប្រាស់ទទួលខុសត្រូវក្នុងការរក្សាការសម្ងាត់របស់ពួកគេ។
                លិខិតសម្គាល់គណនី
                និងសម្រាប់សកម្មភាពទាំងអស់ដែលកើតឡើងនៅក្រោមគណនីរបស់ពួកគេ។
              </li>
              <li class="list-group-item bg-my-default text-my-default">
                អ្នកប្រើប្រាស់យល់ព្រមគោរពតាមច្បាប់ បទបញ្ជា និង
                គោលការណ៍នៅពេលប្រើប្រាស់សេវាកម្មរបស់យើង។
              </li>
              <li class="list-group-item bg-my-default text-my-default">
                អ្នកប្រើប្រាស់អាចមិនចូលរួមក្នុងសកម្មភាពដែលរំលោភលើសិទ្ធិរបស់
                ផ្សេងទៀត រំខានដល់គេហទំព័រ ឬសេវាកម្ម ឬពាក់ព័ន្ធនឹងការក្លែងបន្លំ
                ការបំភាន់ ឬបោកបញ្ឆោត ការអនុវត្ត។
              </li>
            </ul>

            <h4 class="mt-4">3. ដែនកំណត់សេវាកម្ម</h4>
            <p>
              ខណៈពេលដែលយើងខិតខំផ្តល់សេវាកម្មដែលអាចទុកចិត្តបាន និងទាន់ពេលវេលា CSC
              Express មិនធានានោះទេ។ សេវាកម្ម នឹងមិនមានការរំខាន គ្មានកំហុស
              ឬបំពេញតាមការរំពឹងទុករបស់អ្នកប្រើប្រាស់ទាំងអស់។
            </p>
            <p>
              CSC Express មិនទទួលខុសត្រូវចំពោះការខូចខាតដោយផ្ទាល់ ប្រយោល ចៃដន្យ
              ឬជាផលវិបាកណាមួយឡើយ។ លទ្ធផល ពីការប្រើប្រាស់សេវាកម្មរបស់យើង
              រួមទាំងប៉ុន្តែមិនកំណត់ចំពោះការពន្យារពេល ការបាត់បង់ការដឹកជញ្ជូន
              ឬមិនត្រឹមត្រូវ ការដឹកជញ្ជូន។
            </p>

            <h4 class="mt-4">4. ការទូទាត់ និងថ្លៃសេវា</h4>
            <p>
              អ្នកប្រើប្រាស់យល់ព្រមបង់ថ្លៃសេវា
              និងថ្លៃសេវាដែលអាចអនុវត្តបានទាំងអស់សម្រាប់សេវាកម្មដែលផ្តល់ដោយ CSC
              Express។ ការទូទាត់ គឺ ដល់ពេលនៃសេវាកម្ម ហើយ CSC Express
              រក្សាសិទ្ធិក្នុងការផ្អាក ឬបញ្ចប់សេវាកម្ម សម្រាប់ ការមិនបង់ប្រាក់។
            </p>

            <h4 class="mt-4">5. កម្មសិទ្ធិបញ្ញា</h4>
            <p>
              ខ្លឹមសារទាំងអស់នៅលើគេហទំព័ររបស់យើង រួមទាំង
              ប៉ុន្តែមិនកំណត់ចំពោះអត្ថបទ ក្រាហ្វិក ឡូហ្គោ និងរូបភាព នេះ។
              ទ្រព្យសម្បត្តិរបស់ CSC Express ឬអ្នកផ្គត់ផ្គង់មាតិការបស់វា
              ហើយត្រូវបានការពារដោយច្បាប់កម្មសិទ្ធិបញ្ញា។
              អ្នកប្រើប្រាស់មិនអាចផលិតឡើងវិញ ចែកចាយ
              ឬបង្កើតស្នាដៃចម្លងពីមាតិការបស់យើងដោយគ្មានមុន។
              ការយល់ព្រមជាលាយលក្ខណ៍អក្សរ។
            </p>

            <h4 class="mt-4">6. ច្បាប់គ្រប់គ្រង</h4>
            <p>
              លក្ខខណ្ឌនៃការប្រើប្រាស់ទាំងនេះត្រូវបានគ្រប់គ្រងដោយ
              និងបកស្រាយស្របតាមច្បាប់នៃ [បញ្ចូល យុត្តាធិការ]
              ដោយមិនគិតពីជម្លោះនៃគោលការណ៍ច្បាប់។
            </p>

            <h4 class="mt-4">7. ព័ត៌មានទំនាក់ទំនង</h4>
            <p>
              ប្រសិន​បើ​អ្នក​មាន​សំណួរ
              ឬ​ការ​ព្រួយ​បារម្ភ​អំពី​លក្ខខណ្ឌ​ប្រើប្រាស់​ទាំង​នេះ
              សូម​ទាក់ទង​មក​យើង​តាម​រយៈ៖
            </p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item bg-my-default text-my-default">
                <strong>Email:</strong>csc.express@gmail.com
              </li>
              <li class="list-group-item bg-my-default text-my-default">
                <strong>Phone:</strong>086 35 95 62
              </li>
              <li class="list-group-item bg-my-default text-my-default">
                <strong>Address:</strong>Ant Trainning Center
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            យល់ព្រម
          </button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
