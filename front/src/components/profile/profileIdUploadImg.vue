<template>
  <div>


    <div class="title has-text-white">

      <div id="images" class="columns is-1 is-horizontal">
        <div class="column" v-for="(img, index) in images">
          <span class="subtitle">
            <font-awesome-icon v-if="isMe" class="class-set-pp" icon="star" :color="(userInfos.pic === img.pic_name) ? '#E7D724' : '#c6c3ff'" size="1x" @click="setPp(img.pic_name)"/>
          </span>
          <span class="subtitle">
            <font-awesome-icon v-if="isMe === false && userInfos.pic === img.pic_name" class="class-set-pp" icon="star" color="#209cee" size="1x"/>
          </span>
          <span class="subtitle">
            <font-awesome-icon v-if="isMe" class="class-delete-pic" icon="minus-circle" size="1x" @click="deletePhoto(img, index)"/>
          </span>

          <figure class="image is-128x128">
            <img class="is-rounded" :src="require(`../../../../back/UsersPhotos/pictures/${img.pic_name}`)" width="128" height="128"/>
          </figure>
        </div>
      </div>


      <div v-if="isUpload && isMe">
        <p>Ajoutez une photo
          <span>
            <input type="file" class="is-hidden" @change="onFileChange"	accept="image/*" ref="fileInput">
            <button @click="$refs.fileInput.click()" class="button is-text"><font-awesome-icon icon="camera" size="2x" color="white"/></button>
          </span>
        </p>
      </div>

    </div>

  </div>
</template>

<script>
    import axios from 'axios'
    import path from 'path'

    export default {
        name: 'ProfileUploadImg',
        props: {
            userInfos: null,
            isMe: null,
        },
        data () {
            return {
                images: [],
                count_pic: null,
                isUpload: null,
                uploadImage: null,
                noImage: null,
                file: null
            }
        },
        methods: {

            deletePhoto (img, index) {
                if (img.pic_name === this.userInfos.pic) {
                    this.setPp('default.gif', -1)
                }
                axios.post('/users-photos/delete/' + this.userInfos.username, {
                    data: {
                        id: img.id,
                        pic_name: img.pic_name
                    }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            this.images.splice(index, 1)
                            this.count_pic--
                            this.isUpload = true
                        }
                    })

            },

            uploadPic (image, file) {
                axios.post('/users-photos/create/' + this.userInfos.username, {
                    data: {
                        image_data: image,
                        image_type: file.type
                    }
                })
                    .then(res => {
                        if (res.status === 201) {
                            setTimeout(() => {
                                this.images.push({pic_name: res.data.pic_name, id: res.data.id})
                            }, 5000)
                            this.count_pic++
                            if (this.count_pic === 5) {
                                this.isUpload = false
                            } else {
                                this.isUpload = true
                            }
                        }
                    })
            },

            onFileChange (e) {
                this.file = e.target.files || e.dataTransfer.files;
                if (!this.file.length)
                    return;
                this.createImage(this.file[0]);
            },

            createImage (file) {
                this.uploadImage = new Image();
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.uploadImage = e.target.result;
                    this.uploadPic(this.uploadImage, file)
                };
                reader.readAsDataURL(this.file[0]);
            },

            setPp (name) {
                axios.put('/users-photos/set-pp/' + this.userInfos.username, {
                    data: {
                        pic_name: name
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.userInfos.pic = name
                        }
                    })
            },

            getPictures () {
                axios.get('/users-photos/get-all/' + this.userInfos.username)
                    .then(res => {
                        if (res.status === 200) {
                            this.images = res.data.images
                            this.count_pic = res.data.count_pic
                            if (this.count_pic === 5) {
                                this.isUpload = false
                            } else {
                                this.isUpload = true
                            }
                        }
                    })
            }
        },
        created () {
            this.getPictures()
        }
    }
</script>

<style>

  img {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }

  .class-delete-pic {
    position: relative;
    top: 30px;
    left: 80px;
    z-index: 2;
    color: #ff3860;
  }

  .class-set-pp {
    position: relative;
    top: 30px;
    z-index: 2;
  }

</style>


