import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import cookie from 'react-cookies';
import { TagInput } from 'reactjs-tag-input';
import './tags.css';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Pagination, PaginationItem, PaginationLink, Table,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
const base = process.env.REACT_APP_ADMIN_SERVER_URL;
const publicUrl = process.env.REACT_APP_PUBLIC_URL;

class Products extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.displaySpecificationValueData = [];
    this.displaySpecificationDetailsData = [];
    this.specficationsAll = [];
    this.specificationDetailsFull = [];

    this.state = {
      // modal
      modal: false,
      large: false,
      editLarge: false,
      productImagePreview:[],
      descriptionImages:[],
      descriptionPreviewImages:[],
      homeImage:'NAN',
      categoryIdValue:'',
      getEditId: '',

      // for text
      productDescriptionFull: [{title: "", description: "", descriptionImage: ""}],
      productDescriptionFullEdit: [{title: "", description: "", descriptionImage: ""}],
      images: [{productImage: ""}],
      pictures: [],
      productSPDFull: [],
      productSPD: [],
      productSpecificationBoxFun: [],
      productSpecificationBoxFun1: [],
      productSPName: [],
      deleteProduct: [],

      // for products
      products: [],
      productsCategory: [],
      productsCategoryList: [],
      productsSpecificationName: [],
      productsSpecificationDetails: [],
      vendorList: [],
      productList: [],
      newProductCode: '',
      userList: [],
      userName: '',
      userCode: '',
      showProductsSpecificationValue : this.displaySpecificationValueData,
      postProductsSpecificationValue : "",
      showDisplaySpecificationDetailsData : this.displaySpecificationDetailsData,
      postProductsSpecificationDetails : "",
      // specficationsAll : [],
      specificationDetailsFullState : {},
      vendorId: '',
      productSKUcode : '',
      user_type: '',

      details : "",
      productSpecificationDetailsArray:[],

      productIdForAuthorize: 0,
      isAuthorizeClicked: '',

      // for checkbox

      collapse: true,
      fadeIn: true,
      timeout: 300,
      productImages:[],
      productImagesJson:[],
      imagePreview3:'',
      imagePreview4:'',
      imagePreview5:'',
      imagePreview6:'',
      imagePreview7:'',
      imagePreview8:'',
      imagePreview9:'',
      imagePreview10:'',
      imagePreview11:'',
      imagePreview12:'',
      imagePreview13:'',
      allProductsArray:[],

      // FOR EDIT
      productUpdatedImages:[],
      productUpdatedImagesJson:[],
      // imageUpdatedPreview
      // imagePreview3:'',
      // imagePreview4:'',
      // imagePreview5:'',
      // imagePreview6:'',
      // imagePreview7:'',
      // imagePreview8:'',
      // imagePreview9:'',
      // imagePreview10:'',
      // imagePreview11:'',
      // imagePreview12:'',
      // imagePreview13:'',
      allProductsUpdatedArray:[],

      pId: '',
      pName: '',
      cId: '',
      cName: '',
      pSKU: '',
      pPrice: '',
      pBrand: '',
      pVendor: '',
      pvName: '',
      pSN: '',
      aPSN: '',
      pSD: '',
      entry_user_type: '',
      description: '',
      images: '',
      counLooperForDescription: 0,
      checkOrUnchaeck: true,
      detailsId: '',
      isCategoryChangedForUpdate: 0,
      categoryIdAtUpdateClicked: 0,
      isDescriptionForUpdate: 0,
      descriptionTitle: 'title',
      values: [],
      valuesD: [],

      editSpecificationNameArray: [],
      checkSpecificationName: 0,
      colorList: [],
      sizeList: [],
      successSize: false,
      successColor: false,
      isColorOrSizeClicked: false,
      specficationsStateAll: [],
      colorImages: [],
      colorImageObjects: [],
      getColorIdForImage: 0,
      isImageEnable: false,

      // react-tag-tabs
      tags: [],
    };

    // for modal
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleEditLarge = this.toggleEditLarge.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.toggleSuccessSize = this.toggleSuccessSize.bind(this);
    this.toggleSuccessColor = this.toggleSuccessColor.bind(this);

    // to get data from node.js
    // this.handleGetProductCategory = this.handleGetProductCategory.bind(this);

    // to submit the data
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.detailsChange = this.detailsChange.bind(this);
    this.handleSPDFullChange = this.handleSPDFullChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeSpecification = this.handleChangeSpecification.bind(this);
    this.createImages = this.createImages.bind(this);
    this.createUpdatedImages = this.createUpdatedImages.bind(this);

    // react-tag-tab
    this.onTagsChanged = this.onTagsChanged.bind(this);
  }

  // react-tag-tab
  onTagsChanged(tags) {
        this.setState({tags})
    }

  toggleEditLarge() {
    console.log('Toggle edit large !', this.state.editLarge);
    console.log('Toggle edit id : ', this.state.getEditId);
    this.setState({
      editLarge: !this.state.editLarge,
      editSpecificationNameArray: [],

    });

    window.location = "/product/products";

    this.specficationsAll = [];

    console.log('Toggle edit large !', this.state.editLarge);
  }

  toggleSuccessSize(event) {
    console.log('Size : ', this.state.addNewSize);

    if (event == 'Yes') {

      fetch(base+`/api/addMoreSize/?sizeType=${this.state.sizeType}&size=${this.state.addNewSize}`, {
        method: 'GET',
        headers: {'Authorization': 'Atiq '+cookie.load('token')}
      })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(infos => {
        console.log('Data : ', infos);

        if (infos.success == true) {
          ToastsStore.success(infos.message);

          this.handleGetSize();

          this.specficationsAll = [];

          console.log('isColorOrSizeClicked : ', this.state.isColorOrSizeClicked);

          setTimeout(() => {
            this.changeSpecification();
            // window.location = '/category/categories';
          }, 100);

          setTimeout(() => {
            this.setState({
              successSize: !this.state.successSize,
              addNewColor: ''
            });

            // window.location = '/category/categories';
          }, 1000);
        }
        else {
          ToastsStore.warning(infos.message);

          this.handleGetColors();

          setTimeout(() => {
            this.setState({
              successSize: !this.state.successSize,
            });
            // window.location = '/category/categories';
          }, 1000);
        }

        return false;
      });

    }
    else {
      this.setState({
        successSize: !this.state.successSize,
      });
    }
  }

  toggleSuccessColor(event) {
    if (event == 'Yes') {

      fetch(base+`/api/addMoreColor/?addNewColor=${this.state.addNewColor}`, {
        method: 'GET',
        headers: {'Authorization': 'Atiq '+cookie.load('token')}
      })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(infos => {
        console.log('Data : ', infos);

        if (infos.success == true) {
          ToastsStore.success(infos.message);

          this.handleGetColors();

          this.specficationsAll = [];

          console.log('isColorOrSizeClicked : ', this.state.isColorOrSizeClicked);

          setTimeout(() => {
            this.changeSpecification();
            // window.location = '/category/categories';
          }, 100);

          setTimeout(() => {
            this.setState({
              successColor: !this.state.successColor,
              addNewColor: ''
            });

            // window.location = '/category/categories';
          }, 1000);
        }
        else {
          ToastsStore.warning(infos.message);

          this.handleGetColors();

          setTimeout(() => {
            this.setState({
              successColor: !this.state.successColor,
            });
            // window.location = '/category/categories';
          }, 1000);
        }

        return false;
      });

    }
    else {
      this.setState({
        successColor: !this.state.successColor,
      });
    }

  }

  componentDidMount() {
    console.log('component mount executed');

    this.state.userName = localStorage.getItem('userName');
    const userPassword = localStorage.getItem('userPassword');
    this.state.vendorId = localStorage.getItem('employee_id');
    this.state.user_type = localStorage.getItem('user_type');

    if(this.state.userName===null && userPassword === null)
    {
      this.props.history.push("/login");
    }

    fetch(base+'/api/categories', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(category => {
      console.log(category.data);
      this.setState({
        productsCategory : category.data
      })

      return false;
    });

    // console.log('specialCategoryListForSpecification');

    fetch(base+'/api/specialCategoryListForSpecification', {
      method: 'GET'
    })
    .then(res => {
      console.log('Response From Special Category : ', res);
      return res.json()
    })
    .then(category => {
      let categoryList = [];
      console.log('Category List Name : ');
      console.log('Category List : ', category.data);

      for ( let i = 0; i < category.data.length; i++) {
        if (category.data[i] != null) {
          categoryList[i] = category.data[i];
        }
      }

      console.log('Category List updated : ', categoryList);

      this.setState({
        productsCategoryList : categoryList
      })

      console.log('Category List final state : ', categoryList);

      return false;
    });


    fetch(base+'/api/product_specification_names', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(specificationName => {
      console.log(specificationName.data);
      this.setState({
        productsSpecificationName : specificationName.data
      })

      console.log('Specification Data ...... : ', this.state.productsSpecificationName);
      return false;
    });

    fetch(base+'/api/product_specification_details_for_product_entry', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(specificationName => {
      console.log(specificationName.data);
      this.setState({
        productsSpecificationDetails : specificationName.data
      })

      console.log('Specification Details Data --------- : ', this.state.productsSpecificationDetails);
      return false;
    });

    fetch(base+'/api/allProducts', {
      method: 'GET'
    })
    .then(res => {
      return res.json()
    })
    .then(allProducts => {
      this.setState({
        allProductsArray : allProducts.data
      })

      console.log('Specification Details Data ///// : ', this.state.productsSpecificationDetails);
      return false;
    });

    fetch(base+'/api/vendor_list_for_product', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(vendors => {
      console.log(vendors.data);
      this.setState({
        vendorList : vendors.data
      })

      this.state.vendorList.map ((value, key) => {
        if (value.email == this.state.userName) {
          this.state.userCode = value.code;
        }
      })

      console.log('Vendor Data : ', this.state.vendorList);
      return false;
    });

    fetch(base+'/api/user_list', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(userList => {
      console.log(userList.data);
      this.setState({
        userList : userList.data
      })

      console.log('Vendor Data : ', this.state.userList);
      console.log('Local storage user name : ', this.state.userName);

      return false;
    });

    console.log('Trying to fetch product !');

    fetch(base+`/api/product_list/?id=${this.state.userName}`, {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(products => {
      console.log('THe api response for products quesry : ', products.data);
      this.setState({
        productList : products.data
      })

      let countProducts = this.state.productList.length+1;

      // while (countProducts.toString().length < 5) {
      //   countProducts = "0" + countProducts;
      //   console.log('product counter increment : ', countProducts.length);
      // }

      console.log('product counter increment Final : ', countProducts);

      this.setState ({
        newProductCode : countProducts
      })

      console.log('Vendor Data : ', this.state.productList);

      return false;
    });

    this.handleGetColors();

    this.handleGetSize();

  }

  handleGetColors() {
    fetch(base+'/api/getColors', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(infos => {
      console.log(infos.data);
      this.setState({
        colorList: infos.data
      });
      return false;
    });
  }

  handleGetSize () {
    fetch(base+'/api/getSizeInfos', {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(infos => {
      console.log(infos.data);
      this.setState({
        sizeList: infos.data
      });
      return false;
    });
  }

  deleteItem (event) {
    console.log('delete Item function called !');
    this.state.getDeleteId = event.currentTarget.dataset['id'];
    this.setState({
      small: !this.state.small,
    });
  }

  editItem (event) {
    event.preventDefault();
    console.log('Edit Item function called !', event.currentTarget.dataset['id']);
    this.state.getEditId = event.currentTarget.dataset['id'];

    fetch(base+`/api/get-product-edit/?id=${event.currentTarget.dataset['id']}`, {
      method: 'GET',
      headers: {'Authorization': 'Atiq '+cookie.load('token')}
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(products => {
      // console.log('The api response for edit : ', products.data);
      // console.log('Product Name : ', products.data.pName);
      // console.log('Product SKU : ', products.data.pSD);

      this.setState({
        editLarge : !this.state.editLarge,
        pName     : products.data.pName,
        pBrand    : products.data.pBrand,
        pPrice    : products.data.pPrice,
        pSKU      : products.data.pSKU,
        cId       : products.data.cId,
        pVendor   : products.data.pVendor,
        pvName    : products.data.pvName,
        pSN       : products.data.pSN,
        aPSN      : products.data.aPSN,
        pSD       : products.data.pSD,
        entry_user_type : products.data.entry_user_type,
        description     :  JSON.parse(products.data.description),
        images    : JSON.parse(products.data.images),
        categoryIdAtUpdateClicked: products.data.cId,
      });

      console.log('Images : ', this.state.images);

      this.editSpecificationName();
      this.editSpecificationDetails();
      // this.editDescription();

      return false;
    });

  }

  editDescription () {

    let countLooper = 0;

    if (this.state.counLooperForDescription < 1) {
      for (let j = 0; j < this.state.description.length; j++) {

        return this.state.productDescriptionFullEdit.map((el, i) => (
          <div key={i}>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="description">Product Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Row>
                  <Col md="11">
                    <Input type="text" placeholder="Title" name="title" id="title" onChange={this.handleChange.bind(this, i)} value={this.state.description[j].title} />
                  </Col>
                  <Col md="1">
                    <span>
                      <a href="#">
                        <i className="fa fa-window-close" onClick={this.removeClick.bind(this, i)}></i>
                      </a>
                    </span>&nbsp;
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col md="11">
                    <Input type="textarea" name="description" id="description" rows="9" placeholder="Description..." onChange={this.handleChange.bind(this, i)} value={this.state.description[j].description} />
                  </Col>
                  <Col md="1">

                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="12" md="9">
                    {
                        this.state.descriptionPreviewImages[i]?<img src={this.state.descriptionPreviewImages[i]} height="100" width="100"></img>
                      :''
                    }
                    <Input type="file" id="descriptionImage" name="descriptionImage" onChange= {this.handleChange.bind(this, i)}/>
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </div>
        ))
      }
    }
    else {
      return this.state.productDescriptionFull.map((el, i) => (
        <div key={i}>
          <FormGroup row>
              <Col md="3">
                <Label htmlFor="description">Product Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Row>
                  <Col md="11">
                    <Input placeholder="Title" name="title" id="title" onChange={this.handleChange.bind(this, i)} />
                  </Col>
                  <Col md="1">
                    <span>
                      <a href="#">
                        <i className="fa fa-window-close" onClick={this.removeClick.bind(this, i)}></i>
                      </a>
                    </span>&nbsp;
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col md="11">
                    <Input type="textarea" name="description" id="description" rows="9" placeholder="Description..." onChange={this.handleChange.bind(this, i)} />
                  </Col>
                  <Col md="1">

                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="12" md="9">
                    {
                      this.state.descriptionPreviewImages[i]?<img src={this.state.descriptionPreviewImages[i]} height="100" width="100"></img>
                      :''
                    }
                    <Input type="file" id="descriptionImage" name="descriptionImage" onChange= {this.handleChange.bind(this, i)}/>
                  </Col>
                </Row>
              </Col>
            </FormGroup>


            {/* <Input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
          </div>
        ))
      }

    console.log('this.state.productDescriptionFullEdit for edit : ', this.state.productDescriptionFullEdit);

  }

editSpecificationDetails () {
  console.log('PRoduct Specification Details : ', this.state.pSD);
  console.log('Product Specificaton Details all : ', this.state.productsSpecificationDetails);

  let counters = 0;

  for (let i = 0; i < this.state.productsSpecificationDetails.length; i++) {

    let parsed_specification_details_name = JSON.parse(this.state.productsSpecificationDetails[i].specification_details_name);

    for (let j = 0; j < parsed_specification_details_name.length; j++) {

      let countLoop = 0;

      for (var x = 0; x < this.state.pSD.length; x++) {

        if (this.state.pSD[x].specificationDetailsName == parsed_specification_details_name[j]) {

          if (this.state.productsSpecificationDetails[i].category_id == this.state.cId && this.state.user_type == this.state.productsSpecificationDetails[i].entry_user_type) {
            console.log('this.state.productsSpecificationDetails : ', this.state.productsSpecificationDetails[i].id);
            console.log('parsed_specification_details_name : ', parsed_specification_details_name[j]);

            this.setState({
              detailsId: this.state.pSD[x].specificationDetailsValue
            })

            this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>);
            this.specficationsAll.push(<Col md="9">{parsed_specification_details_name[j]}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, parsed_specification_details_name[j])} name={"detailsId"} value={this.state.detailsId} /></Col>);

            console.log('this.state.specifiationAll.length : ', this.specficationsAll);

            ++counters;
            ++countLoop;
          }

          if (this.state.productsSpecificationDetails[i].category_id == this.state.cId && this.state.entry_user_type == this.state.productsSpecificationDetails[i].entry_user_type) {
            console.log('this.state.productsSpecificationDetails : ', this.state.productsSpecificationDetails[i].id);
            console.log('parsed_specification_details_name : ', parsed_specification_details_name[j]);

            this.setState({
              detailsId: this.state.pSD[x].specificationDetailsValue
            })

            this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>);
            this.specficationsAll.push(<Col md="9">{parsed_specification_details_name[j]}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, parsed_specification_details_name[j])} name={"detailsId"} value={this.state.detailsId} /></Col>);

            ++counters;
            ++countLoop;
          }
        }
      }
      console.log('countLoop : ', countLoop);

      if (countLoop == 0) {
        if (this.state.productsSpecificationDetails[i].category_id == this.state.cId && this.state.user_type == this.state.productsSpecificationDetails[i].entry_user_type) {
          console.log('this.state.productsSpecificationDetails : ', this.state.productsSpecificationDetails[i].id);
          console.log('parsed_specification_details_name : ', parsed_specification_details_name[j]);

          this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>);
          this.specficationsAll.push(<Col md="9">{parsed_specification_details_name[j]}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, parsed_specification_details_name[j])} name={"detailsId"} /></Col>);

          ++counters;
          ++countLoop;
        }

        if (this.state.productsSpecificationDetails[i].category_id == this.state.cId && this.state.entry_user_type == this.state.productsSpecificationDetails[i].entry_user_type) {
          console.log('this.state.productsSpecificationDetails : ', this.state.productsSpecificationDetails[i].id);
          console.log('parsed_specification_details_name : ', parsed_specification_details_name[j]);

          this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>);
          this.specficationsAll.push(<Col md="9">{parsed_specification_details_name[j]}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, parsed_specification_details_name[j])} name={"detailsId"} /></Col>);

          ++counters;
          ++countLoop;
        }

      }

      console.log('Counters Value : ', counters);

    }

  }

  console.log('this.specficationsAll : ', this.specficationsAll);

}


editSpecificationName () {

  let unMatchedValues = [];

  let count1 = 0;

  let category_id = '';

  let specifiation_name_id = '';

  let name_value = '';

  let nameCount = 0;

  let nameTrack = '';

  for (let j = 0; j < this.state.aPSN.length; j++) {

    let allSpecification = JSON.parse(this.state.aPSN[j].value);

    name_value = this.state.aPSN[j].specification_name;

    for (let x = 0; x < allSpecification.length; x++) {

      let count = 0;

      for (let i = 0; i < this.state.pSN.length; i++) {

        category_id = this.state.pSN[i].categoryId;
        specifiation_name_id = this.state.pSN[i].specificationNameId;

        if (this.state.pSN[i].categoryId == this.state.aPSN[j].category_id && this.state.aPSN[j].id == this.state.pSN[i].specificationNameId) {
          ++count1;
          let name = "pSN"+count1;

          console.log('All Specificaton : ', allSpecification);

          if (this.state.pSN[i].specificationNameValue == allSpecification[x]) {
            ++count;

            {/*Print the specification name*/}
            if (name_value != this.state.aPSN[j].specification_name) {
              nameCount = 0;
            }

            if (nameCount == 0) {
              ++nameCount;
              nameTrack = name_value;
              this.state.editSpecificationNameArray.push(<div> {name_value} </div>);
            }
            console.log('Condition 1');
            this.state.editSpecificationNameArray.push(<div><Input type="checkbox" defaultChecked={true} name="pSN" value={this.state.pSN[i].specificationNameValue} /> {this.state.pSN[i].specificationNameValue} <br/> </div>);
          }

        }

      }

      if (category_id == this.state.aPSN[j].category_id && this.state.aPSN[j].id == specifiation_name_id && count == 0) {
        ++count1;

        let name = "pSN"+count1;

        {/*Print the specification name*/}
        if (name_value != this.state.aPSN[j].specification_name) {
          nameCount = 0;
        }

        if (nameCount == 0) {
          ++nameCount;
          nameTrack = name_value;
          console.log('Name Value : ', name_value);
          this.state.editSpecificationNameArray.push(<div> {name_value} </div>);
        }
        console.log('Condition 2');
        this.state.editSpecificationNameArray.push(<div><Input type="checkbox" name="pSN" value={allSpecification[x]} /> {allSpecification[x]} <br/> </div>)
      }

    }

  }

  console.log(this.state.editSpecificationNameArray.length);
  console.log(this.state.editSpecificationNameArray);

  setTimeout(()=> {
    if (this.state.editSpecificationNameArray.length > 0) {
      console.log('Size of specifiation : ', this.state.editSpecificationNameArray.length);
      // this.state.checkSpecificationName = 1;
      this.setState({
        checkSpecificationName: 1
      })
    }
  }, 500);

  console.log('this.state.checkSpecificationName : ', this.state.checkSpecificationName);

}

onChangeImageHandler = (event, id, name) => {
  console.log('onChangeHandler', name);
  console.log('id : ', id);

  if (name == 'colorsImage') {
    let reader = new FileReader();
    let file = event.target.files[0];

    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)){
      ToastsStore.warning("Image is not valid");
      return false;
    }
    else{
      let imageObject = {}
      imageObject.colorId = id;
      imageObject.imageName = file.name;
      this.state.colorImages.push(file);
      this.state.colorImageObjects.push(imageObject);
    }
  }

  setTimeout(()=>{
    console.log('Color Images : ', this.state.colorImageObjects);
  }, 300);

}

onChangeHandler=(event,id, name)=>{
  console.log('event.target.files[0] : ', event.target.files[0]);
  console.log('onChangeHandler', name);

  if (name == 'productImages') {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)){
      ToastsStore.warning("Image is not valid");
      return false;
    }
    else{
      let imageObject = {}
      var serialNumber = event.currentTarget.getAttribute('dataId');
      imageObject.imageName = file.name;
      imageObject.serialNumber = event.currentTarget.getAttribute('dataId');
      this.state.productImages.push(file);
      this.state.productImagesJson.push(imageObject);
      if(serialNumber==3){
        this.setState({homeImage:file.name})
      }
      console.log('Image Serial Number : ', serialNumber);

      reader.onloadend = () => {
        let productImagePreviewObject = {}
        productImagePreviewObject.serialNumber = serialNumber;
        productImagePreviewObject.previewImage = reader.result;
        // this.setState({ productImagePreview: [...this.state.productImagePreview[serialNumber], productImagePreviewObject] });
        if(serialNumber==3){this.setState({imagePreview3:reader.result})}
        if(serialNumber==4){this.setState({imagePreview4:reader.result})}
        if(serialNumber==5){this.setState({imagePreview5:reader.result})}
        if(serialNumber==6){this.setState({imagePreview6:reader.result})}
        if(serialNumber==7){this.setState({imagePreview7:reader.result})}
        if(serialNumber==8){this.setState({imagePreview8:reader.result})}
        if(serialNumber==9){this.setState({imagePreview9:reader.result})}
        if(serialNumber==10){this.setState({imagePreview10:reader.result})}
        if(serialNumber==11){this.setState({imagePreview11:reader.result})}
        if(serialNumber==12){this.setState({imagePreview12:reader.result})}
        if(serialNumber==13){this.setState({imagePreview13:reader.result})}

        // const productImagePreviewn = { ...this.state };
        // productImagePreviewn[serialNumber] = reader.result;
        // this.setState({productImagePreview: productImagePreviewn});
        //  this.setState({productImagePreview productImagePreviewObject})

        //  this.state.productImagePreview.push(productImagePreviewObject);
        //  this.props.updateItem(this.state);

      }
      reader.readAsDataURL(file)
    }

    console.log(this.state);
  }

}

handleSubmitUpdate (event) {
  // START OF PRODUCT UPDATE SUBMISSION.........
  event.preventDefault();

  console.log('Update clicked .... ');

  const data = new FormData(event.target);

  if(this.state.productImages.length>0){
    for (const file of this.state.productImages) {
      data.append('productFiles', file)
    }
  }
  else{
    data.append('productFiles', false);
  }

  if(this.state.descriptionImages.length>0){
    for (const fileDescription of this.state.descriptionImages) {
      data.append('productDescriptionFiles', fileDescription)
    }
  }
  else{
    data.append('productDescriptionFiles', false);
  }

  data.append('productImagesJson', JSON.stringify(this.state.productImagesJson));
  data.append('productSpecificationBoxFun', JSON.stringify(this.state.productSpecificationBoxFun));
  data.append('specificationDetailsFullState', JSON.stringify(this.state.specificationDetailsFullState));
  data.append('productDescriptionFull', JSON.stringify(this.state.productDescriptionFull));
  data.append('homeImage', this.state.homeImage);
  // data.append('vendor_id', localStorage.getItem('employee_id'));vendorId
  if (localStorage.user_type == 'super_admin' || localStorage.user_type == 'admin' || localStorage.user_type == 'admin_manager' ) {
    data.append('vendor_id', this.state.vendorId);
  }
  else {
    data.append('vendor_id', localStorage.getItem('employee_id'));
  }

  data.append('productSKUcode', this.state.productSKUcode);
  data.append('categoryIdValue', this.state.categoryIdValue);
  data.append('getEditId', this.state.getEditId);
  data.append('productBrand', this.state.pBrand);
  data.append('productName', this.state.pName);
  data.append('productPrice', this.state.pPrice);
  data.append('values', this.state.values);
  data.append('valuesD', this.state.valuesD);

  // Display the values
  for (var value of data.values()) {
    console.log(value);
  }

  console.log('Updated Product Id : ', this.state.getEditId);

  axios({
    method: 'post',
    url: base+'/api/updateProduct',
    data: data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Atiq '+cookie.load('token')
    }
  })
  .then(function (response) {
    console.log(response);

    if(response.data.message=="success"){
      ToastsStore.success("Product Successfully updated !!");
      setTimeout(
        function() {
          window.location = '/product/products';
        }
        .bind(this),
        3000
      );
    }
  })
  .catch(function (response) {
    console.log(response);
  });

  // END OF PRODUCT UPDATE SUBMISSION.........
}

onKeyPress(event) {
    console.log('Key Press : ', event.which);
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
}


handleSubmit(event) {
  event.preventDefault();

  console.log('Meta Tags : ', this.state.tags);

  if (this.state.colorImageObjects.length > 0 && this.state.productSpecificationBoxFun1.length > 0 && this.state.colorImageObjects.length != this.state.productSpecificationBoxFun1.length) {
    ToastsStore.warning("Please select color carefully !");
  }
  else {
    const data = new FormData(event.target);
    if(this.state.productImages.length>0){
      for (const file of this.state.productImages) {
        data.append('productFiles', file)
      }
    }
    else{
      data.append('productFiles', false);
    }

    if(this.state.descriptionImages.length>0){
      for (const fileDescription of this.state.descriptionImages) {
        data.append('productDescriptionFiles', fileDescription)
      }
    }
    else{
      data.append('productDescriptionFiles', false);
    }


    data.append('productImagesJson', JSON.stringify(this.state.productImagesJson));
    data.append('productSpecificationBoxFun', JSON.stringify(this.state.productSpecificationBoxFun));
    data.append('specificationDetailsFullState', JSON.stringify(this.state.specificationDetailsFullState));
    data.append('productDescriptionFull', JSON.stringify(this.state.productDescriptionFull));
    data.append('homeImage', this.state.homeImage);
    // data.append('vendor_id', localStorage.getItem('employee_id'));vendorId
    if (localStorage.user_type == 'super_admin' || localStorage.user_type == 'admin' || localStorage.user_type == 'admin_manager' ) {
      data.append('vendor_id', this.state.vendorId);
    }
    else {
      data.append('vendor_id', localStorage.getItem('employee_id'));
    }
    data.append('productSKUcode', this.state.productSKUcode);
    data.append('categoryIdValue', this.state.categoryIdValue);
    data.append('productBrand', this.state.productBrand);
    data.append('colorImages', this.state.colorImages);
    data.append('colorImageObjects', JSON.stringify(this.state.colorImageObjects));
    data.append('productSpecificationBoxFun1', JSON.stringify(this.state.productSpecificationBoxFun1));
    data.append('metaTags', JSON.stringify(this.state.tags));

    if(this.state.colorImages.length>0){
      for (const file of this.state.colorImages) {
        data.append('colorFiles', file)
      }
    }
    else{
      data.append('colorFiles', false);
    }

    console.log('pressed : ', event.key);
    console.log('pressed ... : ', event);

    if (event.keyCode == 13) {
      console.log('Enter key pressed!');
    }
    else {
      axios({
        method: 'post',
        url: base+'/api/saveProduct',
        data: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Atiq '+cookie.load('token')
        }
      })
      .then(function (response) {
        console.log(response);
        //handle success
        // let  data =  response.json();
        if(response.data.message=="success"){
          ToastsStore.success("Product Successfully inserted !!");
          setTimeout(
            function() {
              window.location = '/product/products';
            }
            .bind(this),
            3000
          );
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    }
  }

  // fetch(base+'/api/saveProduct' , {
  //   method: "POST",
  //   headers: {
  //     'Content-type': 'application/json'
  //   },
  //   body: JSON.stringify(this.state)
  // })
  // .then((result) => result.json())
  // .then((info) => {
  //   if (info.success == true) {
  //     ToastsStore.success("Product Successfully inserted !!");
  //     console.log(info.success);
  //     console.log(info.message);

  //     setTimeout(
  //       function() {
  //         window.location = '/product/products';
  //       }
  //       .bind(this),
  //       3000
  //     );
  //   }
  //   else {
  //     ToastsStore.warning("Product Insertion Faild. Please try again !!");
  //     console.log(info.success);
  //     console.log(info.message);
  //   }

  // })


}

handleDelete (event) {
  // let data = event.currentTarget.dataset['data-id'];

  console.log('Delete handled' );
}

handleProductChange(event) {
  this.setState({value: event.target.value});
  // alert(event.target.value);
  let target = event.target;
  let value = target.type === 'checkbox' ? target.checked : target.value;
  let name = target.name;

  this.setState({
    [name]: value
  });

  console.log('key: ', event.target.key);

  console.log('Name : ', name);
  console.log('Value : ', value);
  console.log('this.state.detailsId : ', this.state.detailsId);
  console.log('State Value : ', this.state.vendorId);
}

detailsChange(event) {
  // this.setState({value: event.target.value});
  alert('Details', event.target.value);
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });

}

addClick(){
  if (this.state.categoryIdAtUpdateClicked != 0) {
    this.setState({
      isDescriptionForUpdate: ++this.state.isDescriptionForUpdate,
    });

    setTimeout(()=> {
      this.setState(prevState => ({
        productDescriptionFull: [...prevState.productDescriptionFull, { title: "", description: "", descriptionImage: "" }]
      }))
    }, 50);
  }
  else {
    this.setState(prevState => ({
      productDescriptionFull: [...prevState.productDescriptionFull, { title: "", description: "", descriptionImage: "" }]
    }))
  }

  console.log('productDescriptionFull :', this.state.productDescriptionFull);
}
addClickForEdit(){
  console.log('After clicked on Add Click & addClickForEdit is : ', this.state.prevState);
  this.setState(prevState => ({
    productDescriptionFullEdit: [...prevState.productDescriptionFullEdit, { title: "", description: "", descriptionImage: "" }]
  }))

  console.log('productDescriptionFull For Edit after addClickForEdit :', this.state.productDescriptionFullEdit);
}

addSPDClick(e){
  console.log("SPD : ", e.target.value);
  let targetedValue = e.target.value;
  this.setState(prevState => ({
    productSPDFull: [...prevState.productSPDFull, { spd: ""}]
  }))
  this.state.productSPD.push(targetedValue);
}

addImageClick(){
  this.setState(prevState => ({
    images: [...prevState.images, { productImage: ""}]
  }))
}

specificationBoxFun (e) {
  console.log("specificationBoxFun : ", e.target.value);
  this.setState(prevState => ({
    productSpecificationBoxFun: [...prevState.productSpecificationBoxFun]
  }))
  this.state.productSpecificationBoxFun.push(e.target.value);
}

specificationBoxFun1 (e) {
  console.log("specificationBoxFun : ", e.target.value);
  // this.setState(prevState => ({
  //   productSpecificationBoxFun1[]: [...prevState.productSpecificationBoxFun1]
  // }))
  var spColorObj = {};
  var spColorArr = [];
  spColorObj.colorId = e.target.value;
  spColorObj.imageName = '';

  this.state.productSpecificationBoxFun1.push((spColorObj));

  this.setState({
    getColorIdForImage: e.target.value,
    isImageEnable: true,
  })
}

createSPDUI(){
  // alert('ok')
  return this.state.productSPDFull.map((el, i) => (

    <div key={i}>
      <FormGroup row>
        <Col xs="12" md="12">
          <Input placeholder="Destails Specification" name="spd" id="SPD" onChange={this.handleSPDFullChange.bind(this, i)}/>
        <br/>
    </Col>
  </FormGroup>
</div>
))
}

handleDescriptionEditChange(i, e) {
  this.setState({
    values: { ...this.state.values, [i]: e.target.value }
  });
}

handleDescriptionEditChangeD(i, e) {
  this.setState({
    valuesD: { ...this.state.valuesD, [i]: e.target.value }
  });
}

handleDescriptionEditClick(i, e) {

  this.setState({
    values: { ...this.state.values, [i]: e.target.value }
  });

  setTimeout(()=> {
    this.setState({
      titleClicked: 1
    });
    console.log(this.state);
  }, 50);
}

handleDescriptionEditClickD(i, e) {

  this.setState({
    valuesD: { ...this.state.valuesD, [i]: e.target.value }
  });

  setTimeout(()=> {
    this.setState({
      titleClickedD: 1
    });
    console.log(this.state);
  }, 50);
}

handleChange(i, e) {
  const { name, value } = e.target;

  console.log('inside handleChange for description : ', i);

  if (name == 'descriptionImage') {
    let reader = new FileReader();
    let file = e.target.files[0];

    let productDescriptionFull = [...this.state.productDescriptionFull];
    productDescriptionFull[i] = {...productDescriptionFull[i], [name]: file.name};
    this.setState({ productDescriptionFull });


    this.state.descriptionImages.push(file);

    console.log(reader);

    reader.onloadend = () => {
      console.log('inside onload : ', this.state.descriptionPreviewImages);
      this.setState({ descriptionPreviewImages: [...this.state.descriptionPreviewImages, reader.result] });

    }
    reader.readAsDataURL(file);

    console.log(this.state);
    console.log(productDescriptionFull);
    console.log('description image : ', this.state.descriptionPreviewImages);
    console.log('Result : ', reader);
  }
  else {
    let productDescriptionFull = [...this.state.productDescriptionFull];
    productDescriptionFull[i] = {...productDescriptionFull[i], [name]: value};
    this.setState({ productDescriptionFull  });
  }

  // alert(name);
  // alert(value);

}

createUI(){
  return this.state.productDescriptionFull.map((el, i) => (
    <div key={i}>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="description">Product Description</Label>
      </Col>
      <Col xs="12" md="9">
        <Row>
          <Col md="11">
            <Input placeholder="Title" name="title" id="title" onChange={this.handleChange.bind(this, i)} />
        </Col>
        <Col md="1">
          <span>
            <a href="#">
              <i className="fa fa-window-close" onClick={this.removeClick.bind(this, i)}></i>
          </a>
        </span>&nbsp;
      </Col>
    </Row>
    <br/>
  <Row>
    <Col md="11">
      <Input type="textarea" name="description" id="description" rows="9" placeholder="Description..." onChange={this.handleChange.bind(this, i)} />
  </Col>
  <Col md="1">

  </Col>
</Row>
<br />
<Row>
  <Col md="12" md="9">
    {
      this.state.descriptionPreviewImages[i]?<img src={this.state.descriptionPreviewImages[i]} height="100" width="100"></img>
    :''
  }
  <Input type="file" id="descriptionImage" name="descriptionImage" onChange= {this.handleChange.bind(this, i)}/>
</Col>
</Row>
</Col>
</FormGroup>


{/* <Input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
</div>
))
}

findArrayElementByTitle(array, id) {
  return array.find((element) => {
    return element.serialNumber === id;
  })
}

createImages = ()=>{
  // this.props.updateItem(this.state)
  var previewListImages = [];
  previewListImages = this.state.productImagePreview;
  var imagePreview3 = this.state.imagePreview3;
  var imagePreview4 = this.state.imagePreview4;
  var imagePreview5 = this.state.imagePreview5;
  var imagePreview6 = this.state.imagePreview6;
  var imagePreview7 = this.state.imagePreview7;
  var imagePreview8 = this.state.imagePreview8;
  var imagePreview9 = this.state.imagePreview9;
  var imagePreview10 = this.state.imagePreview10;
  var imagePreview11 = this.state.imagePreview11;
  var imagePreview12 = this.state.imagePreview12;
  var imagePreview13 = this.state.imagePreview13;


  let imageView = [];
  for(var i=3;i<13;i++){

    if(i==7){
      imageView.push(<div style={{height:"10px",width:"100%"}}></div>)
    }
    else if(i==11){
      imageView.push(<div style={{height:"10px",width:"100%"}}></div>)
    }
    imageView.push(
      <Col xs="12" md="3">
        <label for="file-input">
          {

            i==3&&imagePreview3? <img width="120" height="100" src={imagePreview3}/>
          :i==4&&imagePreview4? <img width="120" height="100" src={imagePreview4}/>
        :i==5&&imagePreview5? <img width="120" height="100" src={imagePreview5}/>
      :i==6&&imagePreview6? <img width="120" height="100" src={imagePreview6}/>
    :i==7&&imagePreview7? <img width="120" height="100" src={imagePreview7}/>
  :i==8&&imagePreview8? <img width="120" height="100" src={imagePreview8}/>
:i==9&&imagePreview9? <img width="120" height="100" src={imagePreview9}/>
:i==10&&imagePreview10? <img width="120" height="100" src={imagePreview10}/>
:i==11&&imagePreview11? <img width="120" height="100" src={imagePreview11}/>
:i==12&&imagePreview12? <img width="120" height="100" src={imagePreview12}/>
:i==13&&imagePreview13? <img width="120" height="100" src={imagePreview13}/>
:
<img width="120" height="100" src={publicUrl+"/productFormatedImages/Asset"+i+".png"}/>
}
</label>
<input style={{visibility:"none"}} dataId={i} type="file" onChange= {(e)=>this.onChangeHandler(e,i, 'productImages')}  name="image" />
</Col>
)
}
return imageView;
}

createUpdatedImages = ()=>{

  console.log('Images State : ', this.state.images);

  var previewListImages = [];
  previewListImages = this.state.productImagePreview;
  var imagePreview3 = this.state.imagePreview3;
  var imagePreview4 = this.state.imagePreview4;
  var imagePreview5 = this.state.imagePreview5;
  var imagePreview6 = this.state.imagePreview6;
  var imagePreview7 = this.state.imagePreview7;
  var imagePreview8 = this.state.imagePreview8;
  var imagePreview9 = this.state.imagePreview9;
  var imagePreview10 = this.state.imagePreview10;
  var imagePreview11 = this.state.imagePreview11;
  var imagePreview12 = this.state.imagePreview12;
  var imagePreview13 = this.state.imagePreview13;

  let imageView = [];

  for(let i=3;i<13;i++){

    let countImageLoop = 0;

    if(i==7){
      imageView.push(<div style={{height:"10px",width:"100%"}}></div>)
    }
    else if(i==11){
      imageView.push(<div style={{height:"10px",width:"100%"}}></div>)
    }
    console.log('countImageLoop for first loop : ', countImageLoop);

    let countImageSecondLoop = 0;
    for (let j = 0; j < this.state.images.length; j++) {
      countImageSecondLoop = j;
      ++countImageSecondLoop;

      // console.log('countImageLoop for second for loop : ', countImageLoop);
      if (this.state.images[j].serialNumber == i && countImageLoop == 0) {


        imageView.push(
          <Col xs="12" md="3">
            <label for="file-input">
              {
                i==3&&imagePreview3? <img width="120" height="100" src={imagePreview3}/>
              :i==4&&imagePreview4? <img width="120" height="100" src={imagePreview4}/>
            :i==5&&imagePreview5? <img width="120" height="100" src={imagePreview5}/>
          :i==6&&imagePreview6? <img width="120" height="100" src={imagePreview6}/>
        :i==7&&imagePreview7? <img width="120" height="100" src={imagePreview7}/>
      :i==8&&imagePreview8? <img width="120" height="100" src={imagePreview8}/>
    :i==9&&imagePreview9? <img width="120" height="100" src={imagePreview9}/>
  :i==10&&imagePreview10? <img width="120" height="100" src={imagePreview10}/>
:i==11&&imagePreview11? <img width="120" height="100" src={imagePreview11}/>
:i==12&&imagePreview12? <img width="120" height="100" src={imagePreview12}/>
:i==13&&imagePreview13? <img width="120" height="100" src={imagePreview13}/>
:
<img width="120" height="100" src={publicUrl+"/upload/product/productImages/"+this.state.images[j].imageName}/>
}
</label>
<input style={{visibility:"none"}} dataId={i} type="file" onChange= {(e)=>this.onChangeHandler(e,i)}  name="image" />
</Col>
);
++countImageLoop;
}
else if (countImageLoop == 0 && this.state.images.length == countImageSecondLoop) {
  imageView.push(
    <Col xs="12" md="3">
      <label for="file-input">
        {
          i==3&&imagePreview3? <img width="120" height="100" src={imagePreview3}/>
        :i==4&&imagePreview4? <img width="120" height="100" src={imagePreview4}/>
      :i==5&&imagePreview5? <img width="120" height="100" src={imagePreview5}/>
    :i==6&&imagePreview6? <img width="120" height="100" src={imagePreview6}/>
  :i==7&&imagePreview7? <img width="120" height="100" src={imagePreview7}/>
:i==8&&imagePreview8? <img width="120" height="100" src={imagePreview8}/>
:i==9&&imagePreview9? <img width="120" height="100" src={imagePreview9}/>
:i==10&&imagePreview10? <img width="120" height="100" src={imagePreview10}/>
:i==11&&imagePreview11? <img width="120" height="100" src={imagePreview11}/>
:i==12&&imagePreview12? <img width="120" height="100" src={imagePreview12}/>
:i==13&&imagePreview13? <img width="120" height="100" src={imagePreview13}/>
:
<img width="120" height="100" src={publicUrl+"/productFormatedImages/Asset"+i+".png"}/>
}
</label>
<input style={{visibility:"none"}} dataId={i} type="file" onChange= {(e)=>this.onChangeHandler(e,i)}  name="image" />
</Col>
);
++countImageLoop;
}
}

}
return imageView;
}

createImageUI(){

  return(
    <React.Fragment>
      <FormGroup row>
        <Col md="12">
          <Label htmlFor="productImage"> Upload Product Image</Label>
      </Col>
    </FormGroup>
    <FormGroup row>
      {this.createImages()}
    </FormGroup>
  </React.Fragment>
)
}

createUpdatedImageUI(){

  return(
    <React.Fragment>
      <FormGroup row>
        <Col md="12">
          <Label htmlFor="productImage"> Update Product Image</Label>
      </Col>
    </FormGroup>
    <FormGroup row>
      {this.createUpdatedImages()}
    </FormGroup>
  </React.Fragment>
)
}



handleChangeSpecification(key, e) {

  console.log(e.target);
  console.log(key);
  let i =0;
  const { name, value } = e.target;
  console.log('name',key);
  console.log('value',value);

  setTimeout(()=>{
    this.setState({
      detailsId: value
    });

    console.log('detailsId : ', this.state.detailsId);
  }, 200);

  let specificationDetailsFull = [...this.specificationDetailsFull];
  specificationDetailsFull = {...specificationDetailsFull, value};
  this.specificationDetailsFull[key] = specificationDetailsFull;
  this.state.specificationDetailsFullState[key] = specificationDetailsFull;
  console.log('Consoling details sdfsf',this.specificationDetailsFull);
  this.setState({ specificationDetailsFull });

}

handleSPDFullChange(i, e) {

  const { name, value } = e.target;
  // alert(name);
  // alert(value);
  let productSPDFull = [...this.state.productSPDFull];
  productSPDFull[i] = {...productSPDFull[i], [name]: value};
  this.setState({ productSPDFull });
}

removeClick(i){
  let productDescriptionFull = [...this.state.productDescriptionFull];
  productDescriptionFull.splice(i, 1);
  this.setState({ productDescriptionFull });
}

handleImageChange(i, e) {
  const { name, value } = e.target;
  let images = [...this.state.images];
  images[i] = {...images[i], [name]: value};
  this.setState({ images });
}

removeImageClick(i){
  let images = [...this.state.images];
  images.splice(i, 1);
  this.setState({ images });
}

toggle() {
  this.setState({ collapse: !this.state.collapse });
}

toggleFade() {
  this.setState((prevState) => { return { fadeIn: !prevState }});
}

getInitialState () {
  return {value: 'select'}
}

addMoreSize (event) {
  console.log('Add more size', event.currentTarget.dataset['id']);
  this.setState({
    successSize: !this.state.success,
    sizeType: event.currentTarget.dataset['id'],
    isColorOrSizeClicked: true
  });
}

addMoreColor (event) {
  console.log('Add More color');
  this.setState({
    successColor: !this.state.successColor,
    isColorOrSizeClicked: true
  });
}

changeSpecification = (event) => {
  // FOR PRODUCT UPDATE ...................................
  if (this.state.categoryIdAtUpdateClicked != 0) {
    this.setState({
      isCategoryChangedForUpdate: 1
    })
    if (this.state.categoryIdAtUpdateClicked == event.target.value) {
      this.setState({
        isCategoryChangedForUpdate: 0
      })
    }
    console.log('change specification cc : ', event.target.value);
    let targetedValue = event.target.value;
    var count = 0 ;

    this.specficationsAll=[];
    this.setState({categoryIdValue: event.target.value});

    this.state.productSKUcode = 'BNJ-000'+this.state.vendorId+'-0000'+this.state.newProductCode;

    console.log('Array : ', this.displaySpecificationValueData);

    this.setState(prevState => ({
      productSPName: [...prevState.productSPName]
    }))
    this.state.productSPName.push(targetedValue);

    this.setState({value: event.target.value});

    let counter = 0;
    let counters = 0;
    console.log('Consoling specifiation',this.state.productsSpecificationName);

    {
      this.state.productsSpecificationName.map((productsSpecificationNameValue, key) =>

        event.target.value == productsSpecificationNameValue.category_id ?
          <div row>
            {this.specficationsAll.push(<Col md="3">{ counter == 0 ? 'Product Specifications ' : null }</Col>)}
            {this.specficationsAll.push(<Col md="9">{productsSpecificationNameValue.specification_name} :</Col>)}
          </div>
        :
        null
      )
    }

    console.log('Specificaton details ......... tut : ', this.state.productsSpecificationDetails);
    console.log('Category Id value changed and now : ', event.target.value);
    {
      this.state.productsSpecificationDetails.map((productsSpecificationDetailsValue, key) =>
        JSON.parse(productsSpecificationDetailsValue.specification_details_name).map((productsSpecificationDetailsValueParsed, key) =>
          <div row>
            {
              event.target.value == productsSpecificationDetailsValue.category_id && this.state.user_type == productsSpecificationDetailsValue.entry_user_type ?
              // this.specficationsAll.push(<div> { counters == 0 ? <Col md="3"><Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label></Col> : <Col md="3"></Col> } <Col md="9"> {productsSpecificationDetailsValueParsed}&nbsp; <Input type="text" id="detailsId" /*onChange={this.handleChangeSpecification.bind(this)}*/ name={"detailsId : "+productsSpecificationDetailsValueParsed+" "} /*value={productsSpecificationDetailsValueParsed+" : "}*/  /> </Col> </div>) :
              <div>
                {this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>)}
                {this.specficationsAll.push(<Col md="9">{productsSpecificationDetailsValueParsed}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, productsSpecificationDetailsValueParsed)} name={"detailsId"} /*value={productsSpecificationDetailsValueParsed+" : "}*/  /></Col>)}
                {++counters}
              </div>
              :null
            }

          </div>
        )
      )
    }

if (this.specficationsAll.length == 1) {
  this.specficationsAll.push(<div row><Col md="12"><strong>Note : </strong>No Specificaton Found For This Product Category</Col></div>);
}
}
// END FOR PRODUCT UPDATE ...................................

// START FOR NEW PRODUCT INSERT ...............................
if (this.state.categoryIdAtUpdateClicked == 0) {
console.log('this.state.isColorOrSizeClicked *** : ', this.state.isColorOrSizeClicked );
console.log('this.state.colorList *** : ', this.state.colorList );

  if (this.state.isColorOrSizeClicked == true) {

    let counter = 0;
    let counters = 0;
    console.log('Consoling specifiation',this.state.productsSpecificationName);

    {
      this.state.productsSpecificationName.map((productsSpecificationNameValue, key) =>

        this.state.productCategory == productsSpecificationNameValue.category_id ?
          <div row>
            {this.specficationsAll.push(<Col md="3">{ counter == 0 ? 'Product Specifications ' : null }</Col>)}
            {++counter}
            {this.specficationsAll.push(<Col md="2">{productsSpecificationNameValue.specification_name == 'Color' ? productsSpecificationNameValue.specification_name : 'Size'} :</Col>)}
            {
              this.specficationsAll.push(<Col md="7">
              {
                  productsSpecificationNameValue.type == 0 ?
                    <div>
                      {
                        this.state.colorList.map((colorListValue, key) =>
                          <table  style={{tableLayout: "fixed", width: "100%"}}>
                            <tr>
                              <td>
                                <Input type="checkbox" name="colorsValue" value={colorListValue.id} onClick={this.specificationBoxFun1.bind(this)} />{colorListValue.name}
                              </td>
                              <td>
                                {/* {
                                   this.state.getColorIdForImage == colorListValue.id && this.state.isImageEnable == true ?
                                    <input style={{visibility:"none"}} dataId={key} type="file"  onChange= {(e)=>this.onChangeImageHandler(e,colorListValue.id, 'colorsImage')} name="image" />
                                  :
                                  null
                                } */}
                                <input style={{visibility:"none"}} dataId={key} type="file"  onChange= {(e)=>this.onChangeImageHandler(e,colorListValue.id, 'colorsImage')} name="image" />
                              </td>
                            </tr>
                          </table>
                        )
                      }
                      {
                        <Button color="success" className="btn-pill btn btn-success btn-sm" onClick={this.addMoreColor.bind(this)}> <i className="fa fa-plus-circle"></i> New Color</Button>
                      }
                    </div>
                :
                  <div>
                    {
                      this.state.sizeList.map((sizeListValue, key) =>
                        productsSpecificationNameValue.type == sizeListValue.size_type_id ?
                          <table  style={{tableLayout: "fixed", width: "100%"}}>
                            <tr>
                              <td>
                                <Input type="checkbox" name="sizeValue" value={sizeListValue.id} onClick={this.specificationBoxFun.bind(this)} />{sizeListValue.size}
                              </td>
                            </tr>
                          </table>
                        :
                        null
                      )
                    }
                    {
                      <Button color="success" className="btn-pill btn btn-success btn-sm" data-id={productsSpecificationNameValue.type} onClick={this.addMoreSize.bind(this)}> <i className="fa fa-plus-circle"></i> New Size</Button>
                    }
                  </div>
              }
              </Col> )
            }
          </div>
        :
        null
      )
    }


  {
    this.state.productsSpecificationDetails.map((productsSpecificationDetailsValue, key) =>
    JSON.parse(productsSpecificationDetailsValue.specification_details_name).map((productsSpecificationDetailsValueParsed, key) =>
    <div row>
      {
        this.state.productCategory == productsSpecificationDetailsValue.category_id && this.state.user_type == productsSpecificationDetailsValue.entry_user_type ?
        // this.specficationsAll.push(<div> { counters == 0 ? <Col md="3"><Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label></Col> : <Col md="3"></Col> } <Col md="9"> {productsSpecificationDetailsValueParsed}&nbsp; <Input type="text" id="detailsId" /*onChange={this.handleChangeSpecification.bind(this)}*/ name={"detailsId : "+productsSpecificationDetailsValueParsed+" "} /*value={productsSpecificationDetailsValueParsed+" : "}*/  /> </Col> </div>) :
        <div>
          {this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>)}
          {this.specficationsAll.push(<Col md="9">{productsSpecificationDetailsValueParsed}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, productsSpecificationDetailsValueParsed)} name={"detailsId"} /*value={productsSpecificationDetailsValueParsed+" : "}*/  /></Col>)}
          {++counters}
        </div>
        :null
      }

    </div>

  )
  )
  }

  if (this.specficationsAll.length == 1) {
    this.specficationsAll.push(<div row><Col md="12"><strong>Note : </strong>No Specificaton Found For This Product Category</Col></div>);
  }

  }else {
    console.log('change specification cc : ', event.target.value);
    let targetedValue = event.target.value;
    var count = 0 ;

    this.specficationsAll=[];
    this.setState({categoryIdValue: event.target.value});

    this.state.productSKUcode = 'BNJ-000'+this.state.vendorId+'-0000'+this.state.newProductCode;

    console.log('Array : ', this.displaySpecificationValueData);

    this.setState(prevState => ({
      productSPName: [...prevState.productSPName]
    }))
    this.state.productSPName.push(targetedValue);

    this.setState({value: event.target.value});

    let counter = 0;
    let counters = 0;
    console.log('Consoling specifiation',this.state.productsSpecificationName);

    {
      this.state.productsSpecificationName.map((productsSpecificationNameValue, key) =>

        event.target.value == productsSpecificationNameValue.category_id ?
          <div row>
            {this.specficationsAll.push(<Col md="3">{ counter == 0 ? 'Product Specifications ' : null }</Col>)}
            {++counter}
            {this.specficationsAll.push(<Col md="2">{productsSpecificationNameValue.specification_name == 'Color' ? productsSpecificationNameValue.specification_name : 'Size'} :</Col>)}
            {
              this.specficationsAll.push(<Col md="7">
              {
                  productsSpecificationNameValue.type == 0 ?
                    <div>
                      {
                        this.state.colorList.map((colorListValue, key) =>
                          <table  style={{tableLayout: "fixed", width: "100%"}}>
                            <tr>
                              <td>
                                <Input type="checkbox" name="colorsValue" value={colorListValue.id} onClick={this.specificationBoxFun1.bind(this)} />{colorListValue.name}
                              </td>
                              <td>
                                {/* {
                                  this.state.getColorIdForImage == colorListValue.id && this.state.isImageEnable == true ?
                                    <input style={{visibility:"none"}} dataId={key} type="file" onChange= {(e)=>this.onChangeImageHandler(e,colorListValue.id, 'colorsImage')}  name="image" />
                                  :
                                  null
                                } */}
                                <input style={{visibility:"none"}} dataId={key} type="file" onChange= {(e)=>this.onChangeImageHandler(e,colorListValue.id, 'colorsImage')}  name="image" />
                              </td>
                            </tr>
                          </table>
                        )
                      }
                      {
                        <Button color="success" className="btn-pill btn btn-success btn-sm" onClick={this.addMoreColor.bind(this)}> <i className="fa fa-plus-circle"></i> New Color</Button>
                      }
                    </div>
                :
                  <div>
                    {
                      this.state.sizeList.map((sizeListValue, key) =>
                        productsSpecificationNameValue.type == sizeListValue.size_type_id ?
                          <table  style={{tableLayout: "fixed", width: "100%"}}>
                            <tr>
                              <td>
                                <Input type="checkbox" name="colorsValue" value={sizeListValue.id} onClick={this.specificationBoxFun.bind(this)} />{sizeListValue.size}
                              </td>
                            </tr>
                          </table>
                        :
                        null
                      )
                    }
                    {
                      <Button color="success" className="btn-pill btn btn-success btn-sm" data-id={productsSpecificationNameValue.type} onClick={this.addMoreSize.bind(this)}> <i className="fa fa-plus-circle"></i> New Size</Button>
                    }
                  </div>
              }
              </Col> )
            }
          </div>
        :
        null
      )
    }

  console.log('Specificaton details ......... tut : ', this.state.productsSpecificationDetails);
  console.log('Category Id value changed and now : ', event.target.value);
  {
    this.state.productsSpecificationDetails.map((productsSpecificationDetailsValue, key) =>
    JSON.parse(productsSpecificationDetailsValue.specification_details_name).map((productsSpecificationDetailsValueParsed, key) =>
    <div row>
      {
        event.target.value == productsSpecificationDetailsValue.category_id && this.state.user_type == productsSpecificationDetailsValue.entry_user_type ?
        // this.specficationsAll.push(<div> { counters == 0 ? <Col md="3"><Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label></Col> : <Col md="3"></Col> } <Col md="9"> {productsSpecificationDetailsValueParsed}&nbsp; <Input type="text" id="detailsId" /*onChange={this.handleChangeSpecification.bind(this)}*/ name={"detailsId : "+productsSpecificationDetailsValueParsed+" "} /*value={productsSpecificationDetailsValueParsed+" : "}*/  /> </Col> </div>) :
        <div>
          {this.specficationsAll.push(<Col md="3">{ counters == 0 ? <Label htmlFor="productSpecificationDetails">Product Specification Details&nbsp; </Label> : null }</Col>)}
          {this.specficationsAll.push(<Col md="9">{productsSpecificationDetailsValueParsed}&nbsp; <Input type="text" id="detailsId" onChange={this.handleChangeSpecification.bind(this, productsSpecificationDetailsValueParsed)} name={"detailsId"} /*value={productsSpecificationDetailsValueParsed+" : "}*/  /></Col>)}
          {++counters}
        </div>
        :null
      }

    </div>

  )
  )
  }

  if (this.specficationsAll.length == 1) {
    this.specficationsAll.push(<div row><Col md="12"><strong>Note : </strong>No Specificaton Found For This Product Category</Col></div>);
  }
  }

  setTimeout(()=> {
    this.setState({
      specficationsStateAll: this.specficationsAll
    })
  }, 500);

}

console.log('this.state.categoryIdAtUpdateClicked : ', this.state.categoryIdAtUpdateClicked);
console.log('Specificaton new array', this.specifiationAll);
console.log('Specificaton old array', this.state.productsSpecificationName);
// END FOR NEW PRODUCT INSERT ...............................

}

changeDetailsSpecification = (event) => {

  console.log('change Details specification : ', event.target.value);
  this.setState({value: event.target.value});

  {
    this.state.productsSpecificationDetails.map((productsSpecificationDetailsValue, key) =>

    JSON.parse(productsSpecificationDetailsValue.specification_details_name).map((productsSpecificationDetailsValueParsed, key) =>
    event.target.value == productsSpecificationDetailsValueParsed ?
    this.displaySpecificationDetailsData.push(<div><Input type="text" id="detailsId" name="details" value={productsSpecificationDetailsValueParsed+" : "}  /><br /></div>) :
    null
  )
)
}

console.log( this.displaySpecificationDetailsData);
}

toggleLarge() {
  this.setState({
    large: !this.state.large,
  });
}

toggleSmall(event) {
  // console.log('data-id : ', event.target.value);
  console.log('Name : ', event);
  // delete or update id

  if (event == 'deleteSpecificationDetailsPermitted') {
    console.log('data-id : ', event);

    fetch(base+`/api/deleteProductInfo/?id=${this.state.getDeleteId}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Atiq '+cookie.load('token')
      })
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(deletedInfo => {
      console.log('Deleted Info : ', deletedInfo);

      if (deletedInfo.success == true) {
        ToastsStore.success('Product has successfully deleted !');

        this.setState({
          small: !this.state.small,
        });

        setTimeout(
          function() {
            window.location = '/product/products';
          }
          .bind(this),
          2000
        );
      }
      else {
        ToastsStore.success('Product has aasigned somewhere else !');

        this.setState({
          small: !this.state.small,
        });
      }

      return false;
    });
  }
  else if (event == 'deleteSpecificationDetailsDenied') {
    console.log('data-id : ', event);

    this.state.getDeleteId = 0;

    this.setState({
      small: !this.state.small,
    });
  }
  else if (event == 'authorizeProductPermitted') {
    console.log('data-id : ', event);

    fetch(base+`/api/authorizeProductInfo/?id=${this.state.productIdForAuthorize}&clicked=${this.state.isAuthorizeClicked}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Atiq '+cookie.load('token')
      })
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(approval => {
      console.log('approval Info : ', approval);

      console.log('approval Info : ', approval.message);

      ToastsStore.success(approval.message);

      this.setState({
        small: !this.state.small,
      });

      setTimeout(
        function() {
          window.location = '/product/products';
        }
        .bind(this),
        2000
      );

      return false;
    });
  }
  else if (event == 'authorizeProductDenied') {
    console.log('data-id : ', event);

    this.setState({
      small: !this.state.small,
    });
  }
}

handlevendorList (event) {
  console.log('Handle Vendor Wise Product List : ', event.target.value);

  this.state.vendorId = event.target.value;

  // fetch(`http://admin.banijjo.com.bd:3002/api/getVendorWiseProductList/?id=${event.target.value}` , {
  fetch(base+`/api/getVendorWiseProductList/?id=${event.target.value}`, {
    method: "GET"
  })
  .then((result) => result.json())
  .then((info) => {
    console.log('Product SKU : ', info.data);

    console.log(this.state.productSKUcode);
    this.setState({
      productSKUcode : info.data
    })
  })


}

authorize (event) {
  console.log('authorize function called !', event.currentTarget.dataset['id']);
  console.log('authorize function called !', event.currentTarget.dataset['clicked']);

  this.setState({
    small: !this.state.small,
    productIdForAuthorize: event.currentTarget.dataset['id'],
    isAuthorizeClicked: event.currentTarget.dataset['clicked'],

  });
}

render() {

  return (
    <Row>
      <Col md="12">
        <Card>
          <ToastsContainer store={ToastsStore}/>
        <CardHeader >
          <Row>
            <Col md="6"><i className="fa fa-align-justify"></i> Product List</Col>

          <Col md="6">
            <Button color="success" onClick={this.toggleLarge} className="mr-1"> <i className="fa fa-plus-circle"></i> Add New Product</Button>
        </Col>
      </Row>
    </CardHeader>

    <CardBody>
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Product Name</th>
          <th>Product Image</th>
        <th>Product SKU</th>
      <th>Product Price</th>
    <th>Product Category Name</th>
  <th>Vendor Name</th>
<th>QC Status</th>
<th>Status</th>
<th>Action</th>
{
  localStorage.user_type == 'admin' ?
  <th>Authorization</th>
:
localStorage.user_type == 'super_admin' ?
<th>Authorization</th>
:null
}
</tr>
</thead>
<tbody>
  {

    this.state.productList.map((productListValue, key) =>
    <tr>
      <td>{productListValue.product_name}</td>
    <td>
      {
        productListValue.home_image?
        <img width="100" height="80" src={`${publicUrl+'/upload/product/productImages/'+productListValue.home_image}`}></img>
      // <img width="100" height="80" src={publicUrl+'/upload/product/productImages/'+`${productListValue.home_image}`}></img>
      :
      <img width="100" height="80" src={publicUrl+'/upload/vendor/default.png'}></img>
  }

</td>
<td>{productListValue.product_sku}</td>
<td>{productListValue.productPrice}</td>

{/* <td>{productListValue.product_sku}</td> */}
<td>
  {
    this.state.productsCategory.map((productsCategoryValue, key) =>
    productListValue.category_id == productsCategoryValue.id ? productsCategoryValue.category_name: null
  )
}
</td>


<td>
  {
    this.state.vendorList.map((vendorListValue, key) =>
    productListValue.vendor_id == vendorListValue.id ?vendorListValue.name: null
  )
}
</td>



<td>{productListValue.qc_status}</td>
{/* <td>

  {productListValue.status == 'active' ? <Badge color="success">Active</Badge> : <Badge color="secondary">Inactive</Badge> }

  </td> */}
  <td>

    {productListValue.status == 'active' ?
    <center> <i class="fa fa-check fa-lg" style={{color: '#009345'}}></i>  </center>
  :
  <center> <i class="fa fa-times fa-lg" style={{color: '#009345'}}></i> </center>
}
</td>
<td>
  <center>
    <a href="#">
      {/* <i className="fa fa-info-circle" title="View Product Info"></i> toggleEditLarge */}
      <i className="fa fa-info-circle fa-lg"  title="View Product Info" aria-hidden="true" style={{color: '#009345'}}></i>
  </a>&nbsp;
  <a href="#" onClick={this.editItem.bind(this)}  data-id={productListValue.id}>
    <i className="fa fa-edit fa-lg"  title="Edit Products Info" aria-hidden="true" style={{color: '#009345'}}></i>
</a>&nbsp;
{/*<a href="#" data-id={productListValue.id}>
<i className="fa fa-edit fa-lg"  title="Edit Products Info" aria-hidden="true" style={{color: '#009345'}}></i>
</a>&nbsp;*/}
{
  localStorage.user_type == 'admin'?
  <a href="#" onClick={this.deleteItem.bind(this)} id="deleteIds" ref="dataIds" data-id={productListValue.id} value={productListValue.id}>
    <i className="fa fa-trash fa-lg" title="Delete Products Details" aria-hidden="true" style={{color: '#EB1C22'}}></i>
</a>
:
null
}
{
  localStorage.user_type == 'super_admin'?
  <a href="#" onClick={this.deleteItem.bind(this)} id="deleteIds" ref="dataIds" data-id={productListValue.id} value={productListValue.id}>
    <i className="fa fa-trash fa-lg" title="Delete Products Details" aria-hidden="true" style={{color: '#EB1C22'}}></i>
</a>
:
null
}

</center>
</td>
{
  localStorage.user_type == 'super_admin' ?
  <td>
    {
      productListValue.isApprove == 'authorize' ?
      <center>
        <a data-id={productListValue.id} data-clicked={'Unauthorize'} style={{cursor: 'pointer'}} title="Unauthorize" onClick={this.authorize.bind(this)}>
          <i class="fa fa-chevron-circle-right fa-lg" style={{color: '#009345'}}></i>
      </a>

      {/* <i class="fa fa-angle-left fa-lg" style={{color: '#EB1C22', marginTop: '50%', marginBottom: '50%'}}></i> */}
    </center>
    :
    <center>
      <a data-id={productListValue.id} data-clicked={'Authorize'} style={{cursor: 'pointer'}} title="Authorize" onClick={this.authorize.bind(this)} >
        <i class="fa fa-chevron-circle-right fa-lg" style={{color: 'red'}}></i>
    </a>

    {/* <i class="fa fa-angle-left fa-lg" style={{color: '#EB1C22', marginTop: '50%', marginBottom: '50%'}}></i> */}
  </center>
}

</td>
:
null
}
{
  localStorage.user_type == 'admin' ?
  <td>
    {
      productListValue.isApprove == 'authorize' ?
      <center>
        <a data-id={productListValue.id} data-clicked={'Unauthorize'} style={{cursor: 'pointer'}} title="Unauthorize" onClick={this.authorize.bind(this)}>
          <i class="fa fa-chevron-circle-right fa-lg" style={{color: '#009345'}}></i>
      </a>

      {/* <i class="fa fa-angle-left fa-lg" style={{color: '#EB1C22', marginTop: '50%', marginBottom: '50%'}}></i> */}
    </center>
    :
    <center>
      <a data-id={productListValue.id} data-clicked={'Authorize'} style={{cursor: 'pointer'}} title="Authorize" onClick={this.authorize.bind(this)} >
        <i class="fa fa-chevron-circle-right fa-lg" style={{color: 'red'}}></i>
    </a>

    {/* <i class="fa fa-angle-left fa-lg" style={{color: '#EB1C22', marginTop: '50%', marginBottom: '50%'}}></i> */}
  </center>
}
</td>
:
null
}
</tr>
)
}

{/* <tr>
  <td>Paĉjo Jadon</td>
  <td>2012/02/01</td>
  <td>Staff</td>
  <td>
  <Badge color="danger">Banned</Badge>
  </td>
  </tr>
  <tr>
  <td>Micheal Mercurius</td>
  <td>2012/02/01</td>
  <td>Admin</td>
  <td>
  <Badge color="secondary">Inactive</Badge>
  </td>
  </tr>
  <tr>
  <td>Ganesha Dubhghall</td>
  <td>2012/03/01</td>
  <td>Member</td>
  <td>
  <Badge color="warning">Pending</Badge>
  </td>
  </tr>
  <tr>
  <td>Hiroto Šimun</td>
  <td>2012/01/21</td>
  <td>Staff</td>
  <td>
  <Badge color="success">Active</Badge>
  </td>
  </tr> */}
</tbody>
</Table>
<Pagination>
  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
<PaginationItem active>
  <PaginationLink tag="button">1</PaginationLink>
</PaginationItem>
<PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
</Pagination>
</CardBody>
</Card>
</Col>

<Modal isOpen={this.state.small} toggle={this.toggleSmall}
  className={'modal-sm ' + this.props.className}>
  <ModalHeader toggle={this.toggleSmall}>
    {
      this.state.isAuthorizeClicked == 'Authorize' ?
      <center>
        Product Authorization
      </center>
      :
      this.state.isAuthorizeClicked == 'Unauthorize' ?
      <center>
        Product Unauthorization
      </center>
      :
      <center>
        Delete Product
      </center>
    }
  </ModalHeader>
  <ModalBody>
    <strong>
      {
        this.state.isAuthorizeClicked == 'Authorize' ?
        <center>
          Are Sure to Authorize this product ?
        </center>
        :
        this.state.isAuthorizeClicked == 'Unauthorize' ?
        <center>
          Are Sure to Unauthorize this product ?
        </center>
        :
        <center>
          Are Sure to delete this product ?
        </center>
      }
    </strong>
  </ModalBody>
  <ModalFooter>
    {
      this.state.isAuthorizeClicked == 'Authorize' ?
      <div>
        <Button color="success" onClick={(e)=>{this.toggleSmall('authorizeProductPermitted')}} >yes</Button>{' '}
        <Button color="danger" onClick={(e)=>{this.toggleSmall('authorizeProductDenied')}} >No</Button>
    </div>
    :
    this.state.isAuthorizeClicked == 'Unauthorize'?
    <div>
      <Button color="success" onClick={(e)=>{this.toggleSmall('authorizeProductPermitted')}} >yes</Button>{' '}
      <Button color="danger" onClick={(e)=>{this.toggleSmall('authorizeProductDenied')}} >No</Button>
  </div>
  :
  <div>
    <Button color="success" onClick={(e)=>{this.toggleSmall('deleteSpecificationDetailsPermitted')}} >yes</Button>{' '}
    <Button color="danger" onClick={(e)=>{this.toggleSmall('deleteSpecificationDetailsDenied')}} >No</Button>
</div>
}
</ModalFooter>
</Modal>

{/* EDIT MODAL STARTED */}
<Modal isOpen={this.state.editLarge} toggle={this.toggleEditLarge}
  className={'modal-lg ' + this.props.className}>
  <ModalHeader toggle={this.toggleEditLarge}></ModalHeader>
<ModalBody>
  {/* UPDATE PRODUCT */}
  <Row>
    <Col xs="12" md="12">
      <Card>
        <CardHeader>
          <strong>Update Product</strong>
      </CardHeader>
      <CardBody>
        <Form action="" method="post" encType="multipart/form-data" onSubmit={this.handleSubmitUpdate} onChange={this.handleProductChange} className="form-horizontal">
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="productName">Product Name</Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="text" id="pName" name="pName" placeholder="Product Name" value={this.state.pName}></Input>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="productCategory">Product Category </Label>
    </Col>
    <Col xs="12" md="9">
      <Input type="select" name="cId" onChange={this.changeSpecification} id="cId" value={this.state.cId}>
        <option value="0">Please select</option>
      {
        this.state.productsCategoryList.map((productsCategoryListValue, key) =>

        <option value={key}> {productsCategoryListValue} </option>
    )
  }
  {/* {
    this.state.productsCategoryList.map((productsCategoryListValue, key) =>
    this.state.cId == key ?
    <option value={key} selcted> {productsCategoryListValue} </option>
    :
    <option value={key}> {productsCategoryListValue} </option>
    )
    }*/}
  </Input>
</Col>
</FormGroup>

<FormGroup row>
  <Col md="3">
    <Label htmlFor="productBrand">Brand Name</Label>
</Col>
<Col xs="12" md="9">
  <Input type="text" id="pBrand" name="pBrand" placeholder="Brand Name" value={this.state.pBrand} />
</Col>
</FormGroup>
<FormGroup row>
  <Col md="3">
    <Label htmlFor="productPrice">Product Price</Label>
</Col>
<Col xs="12" md="9">
  <Input type="text" id="pPrice" name="pPrice" placeholder="Product Price" value={this.state.pPrice} />
</Col>
</FormGroup>

{
  this.state.user_type == 'vendor' ?

  <div>
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="vendorList">Vendor </Label>
    </Col>
    <Col xs="12" md="9">
      <Input  type="text" id="pVendor" name="pVendor" placeholder="" readOnly="true" value={this.state.pvName} />
  </Col>
</FormGroup>
</div>
:
<div>
  <FormGroup row>
    <Col md="3">
      <Label htmlFor="vendorList">Vendor List</Label>
    </Col>
    <Col xs="12" md="9">
      <Input type="select" name="pVendor" id="pVendor" onChange={this.handlevendorList.bind(this)} value={this.state.pVendor}>
        <option value="0">Please select</option>
      {
        this.state.vendorList.map((vendorListValue, key) =>
        <option value={vendorListValue.id}> {vendorListValue.name} </option>
        )
      }
      </Input>
    </Col>
  </FormGroup>
</div>
}

{
  this.state.userList.map((userListValue, key) =>
  userListValue.username == this.state.userName ?
  userListValue.user_type == 'vendor' ?
  <div>
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="productSKU">Product SKU</Label>
    </Col>

    <Col xs="12" md="9">
      <Input type="text" id="pSKU" name="pSKU" placeholder="Product SKU" readOnly="true" value={this.state.pSKU} />
  </Col>
</FormGroup>
</div>
:
<div>
  <FormGroup row>
    <Col md="3">
      <Label htmlFor="productSKU">Product SKU</Label>
  </Col>
  <Col xs="12" md="9">
    <Input type="text" id="pSKU" name="pSKU" placeholder="Product SKU" readOnly="true" value={this.state.pSKU} />
</Col>
</FormGroup>
</div>
:
null
)
}



{/* All Specification Name and data for edit */}
<FormGroup row style={{border: '2px', solid: '#000'}}>
  <Col md="3">
    {/*{
      this.state.checkSpecificationName > 0 ?
      'Product Specificaton '
      :
      null
      }*/}
      {
        this.state.isCategoryChangedForUpdate == 0 ?
        this.state.checkSpecificationName > 0 ?
        'Product Specificaton '
        : null
        : null
      }
    </Col>
    <Col md="9"> {this.state.isCategoryChangedForUpdate == 0 ? this.state.editSpecificationNameArray : null} </Col>
</FormGroup>

{/* Color according to the specificatoion */}
<FormGroup row>
  {this.state.isCategoryChangedForUpdate != 0 ? this.specficationsAll : null}
  {/*{this.specficationsAll}*/}
</FormGroup>

{/* {this.editDescription()} */}

{/* {this.state.isDescriptionForUpdate > 0 && this.state.categoryIdAtUpdateClicked != 0 ? this.createUI() : null} */}

{/* need to print this.state.description here */}

{/* {
  this.state.description.length > 0 ?
  this.state.description.map((descriptionValue, index)=>
    <div>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="productSKU">Product Description</Label>
        </Col>
        <Col xs="12" md="9">
          {
            this.state.titleClicked ?
            <Input type = "text" name = {this.state.values[index]}  onChange = {this.handleDescriptionEditChange.bind(this, index)} value = {this.state.values[index]} />
            :
            <Input type = "text" name = {this.state.values[index]} onClick = {this.handleDescriptionEditClick.bind(this, index)}  value = {descriptionValue.title} />
          }
          <br/>
          {
            this.state.titleClickedD ?
            <Input type = "textarea" name = {this.state.valuesD[index]}  onChange = {this.handleDescriptionEditChangeD.bind(this, index)}  value = {this.state.valuesD[index]} />
            :
            <Input type = "textarea" name = {this.state.valuesD[index]}  onClick = {this.handleDescriptionEditClickD.bind(this, index)}  value = {descriptionValue.description} />
          }
        </Col>
      </FormGroup>
    </div>
  )
  :
  null
} */}

<FormGroup row>
  <Col md="3">

  </Col>
  <Col xs="12" md="9">
    {/* <Button color="primary" className="btn-pill btn btn-light btn-block" size="sm" onClick={this.addClick.bind(this)}> <i className="fa fa-plus-square"></i> Add More</Button> */}
  &nbsp;
</Col>
</FormGroup>

{this.createUpdatedImageUI()}

<Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Update</Button>&nbsp;
<Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
</Form>
</CardBody>
<CardFooter>

</CardFooter>
</Card>
</Col>

</Row>
</ModalBody>
</Modal>
{/* EDIT MODAL END */}

<Modal style={{Width:"120% !important",right:"15% !important"}} isOpen={this.state.large} toggle={this.toggleLarge}
  className={'modal-lg ' + this.props.className} >

  <ModalHeader toggle={this.toggleLarge}></ModalHeader>
<ModalBody>

  {/* add new product */}
  <Row>
    <Col xs="12" md="12">
      <Card>
        <CardHeader>
          <strong>Add Product</strong>
      </CardHeader>
      <CardBody>
        <Form action="" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit} onChange={this.handleProductChange} onKeyPress={this.onKeyPress.bind(this)} className="form-horizontal">
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="productName">Product Name</Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="text" id="productName" name="productName" placeholder="Product Name" />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="productCategory">Product Category </Label>
    </Col>
    <Col xs="12" md="9">
      <Input type="select" name="productCategory" onChange={this.changeSpecification} id="productCategory">
        <option value="0">Please select</option>
      {
        this.state.productsCategoryList.map((productsCategoryListValue, key) =>
        <option value={key}> {productsCategoryListValue} </option>
    )
  }
  {/* {
    this.state.productsCategory.map((productsCategoryValue, key) =>
    <option value={productsCategoryValue.id}> {productsCategoryValue.category_name} </option>
    )
    } */}
  </Input>
</Col>
</FormGroup>

<FormGroup row>
  <Col md="3">
    <Label htmlFor="productBrand">Brand Name</Label>
</Col>
<Col xs="12" md="9">
  <Input type="text" id="productBrand" name="productBrand" placeholder="Brand Name" />
</Col>
</FormGroup>
<FormGroup row>
  <Col md="3">
    <Label htmlFor="productPrice">Product Price</Label>
</Col>
<Col xs="12" md="9">
  <Input type="text" id="productPrice" name="productPrice" placeholder="Product Price" />
</Col>
</FormGroup>

{
  this.state.user_type == 'vendor' ?

  <div>
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="vendorList">Vendor </Label>
    </Col>
    <Col xs="12" md="9">
      <Input  type="text" id="vendorId" name="vendorId" placeholder="" readOnly="true" value={this.state.userName} />
  </Col>
</FormGroup>
</div>
:
<div>
  <FormGroup row>
    <Col md="3">
      <Label htmlFor="vendorList">Vendor List</Label>
  </Col>
  <Col xs="12" md="9">
    <Input type="select" name="vendorId" id="vendorId" onChange={this.handlevendorList.bind(this)} value={this.state.vendorId}>
      <option value="0">Please select</option>
    {
      this.state.vendorList.map((vendorListValue, key) =>
      <option value={vendorListValue.id}> {vendorListValue.name} </option>
  )
}
</Input>
</Col>
</FormGroup>
</div>
}

{
  this.state.userList.map((userListValue, key) =>
  userListValue.username == this.state.userName ?
  userListValue.user_type == 'vendor' ?
  <div>
    <FormGroup row>
      <Col md="3">
        <Label htmlFor="productSKU">Product SKU</Label>
    </Col>

    <Col xs="12" md="9">
      <Input type="text" id="productSKU" name="productSKU" placeholder="Product SKU" readOnly="true" value=/*{'BNJ-'+this.state.userCode+'-'+this.state.newProductCode}*/{this.state.productSKUcode} />
  </Col>
</FormGroup>
</div>
:
<div>
  <FormGroup row>
    <Col md="3">
      <Label htmlFor="productSKU">Product SKU</Label>
  </Col>
  <Col xs="12" md="9">
    <Input type="text" id="productSKU" name="productSKU" placeholder="Product SKU" readOnly="true" value={this.state.productSKUcode} />
</Col>
</FormGroup>
</div>
:
null
)
}



{/* Color according to the specificatoion */}
<FormGroup row style={{border: '2px', solid: '#000'}}>
  {/* {this.specficationsAll} */}
  {this.state.specficationsStateAll}
</FormGroup>

{/* Color according to the specificatoion */}
<FormGroup row>
  <Col md="3">
  </Col>
  <Col xs="12" md="9">

  </Col>
</FormGroup>

{this.createUI()}

<FormGroup row>
  <Col md="3">

  </Col>
  <Col xs="12" md="9">
    <Button color="primary" className="btn-pill btn btn-light btn-block" size="sm" onClick={this.addClick.bind(this)}> <i className="fa fa-plus-square"></i> Add More</Button>
  &nbsp;
</Col>
</FormGroup>

<FormGroup row>
  <Col md="3">
    <Label htmlFor="productSKU">Key Words</Label>
  </Col>
  <Col xs="12" md="9">
    <TagInput tags={this.state.tags} onTagsChanged={this.onTagsChanged} placeholder="Type tags & hit enter.." style={{fontFamily:"Roboto"}} />
  </Col>
</FormGroup>

{this.createImageUI()}

<Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;
<Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
</Form>
</CardBody>
<CardFooter>

</CardFooter>
</Card>
</Col>



</Row>

</ModalBody>
{/* <ModalFooter>
  <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
  </ModalFooter> */}
</Modal>

<Modal isOpen={this.state.successSize} toggle={this.toggleSuccessSize}
       className={'modal-success ' + this.props.className}>
  <ModalHeader toggle={this.toggleSuccessSize}>Add New Size</ModalHeader>
  <ModalBody>
    <Input type="text" name="addNewSize" placeholder="New Size" value={this.state.addNewSize} onChange={this.handleProductChange} />
  </ModalBody>
  <ModalFooter>
    <Button color="success" onClick={(e)=>{this.toggleSuccessSize('Yes')}}>Add</Button>{' '}
    <Button color="danger" onClick={(e)=>{this.toggleSuccessSize('No')}}>Cancel</Button>
  </ModalFooter>
</Modal>

<Modal isOpen={this.state.successColor} toggle={this.toggleSuccessColor}
       className={'modal-success ' + this.props.className}>
  <ModalHeader toggle={this.toggleSuccessColor}>Add New Color</ModalHeader>
  <ModalBody>
    <Input type="text" name="addNewColor" placeholder="New Color" value={this.state.addNewColor} onChange={this.handleProductChange} />
  </ModalBody>
  <ModalFooter>
    <Button color="success" onClick={(e)=>{this.toggleSuccessColor('Yes')}}>Add</Button>{' '}
    <Button color="danger" onClick={(e)=>{this.toggleSuccessColor('No')}}>Cancel</Button>
  </ModalFooter>
</Modal>

</Row>

)
}
}



export default Products;