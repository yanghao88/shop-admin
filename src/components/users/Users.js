import axios from 'axios'
export default {
  data () {
    return {
      userData: [
        {
          username: '王小虎',
          email: 'hu@163.com',
          mobile: 1391293612793
        }
      ],
      pagenum: 1,
      total: 0,
      input3: '',
      dialogAddUsersVisible: false,
      addUsersForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      value1: true
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 获取用户信息
    getUsersData (pagenum = 1, query) {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          // console.log(res)
          this.userData = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
    },
    // 分页
    currentChange (curPage) {
      // console.log(curPage)

      this.getUsersData(curPage, this.input3)
    },
    search () {
      this.getUsersData(1, this.input3)
    },
    // 显示用户对话框
    showAddUeserDialog () {
      this.dialogAddUsersVisible = true
    },
    // 添加用户信息
    addUser () {
      axios
        .post('http://localhost:8888/api/private/v1/users', this.addUsersForm, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
        })
      this.getUsersData()
      this.dialogAddUsersVisible = false
    },
    // 关闭重置添加表单
    dialogClosed () {
      this.$refs.addUsersRef.resetFields()
    }
    // 改变状态
    // stateChange () {

    // }
  }
}
